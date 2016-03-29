header = ["L", "Version", "ID"]

newData = []

headerPattern = ~/^.*Version.*ClientID.*/
dataPattern = ~/^(\S)\s+(.{10,10})\s+(\d+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s(.*)(\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+\sKb)\s+(\S+)/

data.eachWithIndex
{
  row, ri ->
  
  if (row[1] =~ headerPattern)
  {
    hdr = row[1].trim().replace("IP address", "IPAddress")
    hdr = hdr.substring(hdr.indexOf("> L ") + 2)
    header = hdr.split(/\s+/)
  }
  else if (row[1] =~ dataPattern)
  {
    m = row[1] =~ dataPattern
    //println "DATA: ${row[1]}"
    ( all, l, version, id, fsxt, s, host, ip, userAndClientId, sessions, producers, consumers, tmpt, tmpq, uncomm, uncommSize, uptime ) = m[0]
    //println "UPTIME  : $uptime"
    //println "USER/CID: $userAndClientId"
    //m[0].eachWithIndex
    //{
    //  d, i ->
    //  println "JOIN: $i = $d"
    //}
    cid = userAndClientId.trim().split(/\s+/)
    //println "CID: ${cid.length}"
    if (cid.length == 1)
    {
      user = cid[0].trim()
      clientId = ""
    }
    else if (cid.length == 2)
    {
      user = cid[0].trim()
      clientId = cid[1].trim()
    }
    
    newData << [ l, version, id, fsxt, s, host, ip, user, clientId, sessions, producers, consumers, tmpt, tmpq, uncomm, uncommSize, uptime ]
  }
  else
  {
    println "SKIP: ${row[1]}"
  }
}
                
data = newData


