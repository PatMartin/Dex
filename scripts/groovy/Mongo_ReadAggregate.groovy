import org.bson.Document;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import groovy.json.*;

//345678901234567890123456789012345678901234567890
def aggregates = [
  [
    op: "\$match",
    args: "{ 'header.type':'app_stats'}"
  ],
  [
    op: "\$project",
    args: "{" +
    "'state': '\$response.0.state',"+
    "'host': '\$response.0.stats.host',"+
    "'name': '\$response.0.stats.name'," +
    "'uris': '\$response.0.stats.uris'," +
    "'port': '\$response.0.stats.port'," +
    "'uptime': '\$response.0.stats.uptime'," +
    "'mem_quota': '\$response.0.stats.mem_quota'," +
    "'disk_quota': '\$response.0.stats.disk_quota'," +
    "'fds_quota': '\$response.0.stats.fds_quota'," +
    "'time': '\$response.0.stats.usage.time'," +
    "'cpu': '\$response.0.stats.usage.cpu'," +
    "'mem': '\$response.0.stats.usage.mem'," +
    "'disk': '\$response.0.stats.usage.disk'" +
    "}"
   ],
  [
    op: "\$sort",
    args: "{ time: 1, name: 1, host: 1 }"
  ]
]

MongoClientURI uri = new MongoClientURI("mongodb://pm09639:local1@vm-716c-e572:27017/advisor")
MongoClient client = new MongoClient(uri);
MongoDatabase db = client.getDatabase(uri.getDatabase());

MongoCollection<Document> collection = db.getCollection("pcf");
List<Document> pipeline = new ArrayList<BasicDBObject>();
aggregates.each {
  aggregate ->
  println "AGGREGATE: '${aggregate}'"
  pipeline.add(new Document(aggregate.op, Document.parse(aggregate.args)))
}
AggregateIterable<Document> results = collection.aggregate(pipeline);

def slurper = new groovy.json.JsonSlurper()

def firstResult = results[0];
def firstGson = slurper.parseText(firstResult.toJson());

header = firstGson.keySet() as List;
data = []

results.eachWithIndex {
  result, ri ->  
  def jsonStr = result.toJson();
  def gson = slurper.parseText(jsonStr)

  def row = header.collect {
    key ->
      return ((result[key] as String).replaceAll(/^\[?(.*?)\]?/) { all, text -> text })
  }
  data << row
}
