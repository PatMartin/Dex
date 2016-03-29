header = [ "SAMPLE", "TYPE", "TIMESTAMP", "TOTALTIMEMS", "STOPTIME", "GC_TYPE", "TOTAL_ID", "FLIPPED_OBJ", "FLIPPED_BYTES",
           "TENURED_OBJ", "TENURED_BYTES", "FINAL_OBJECTS_QUEUED", "TILT_RATIO",
           "NURSERY_FREEBYTES", "NURSERY_TOTALBYTES", "NURSERY_PERCENT", "NURSERY_TENUREAGE",
           "TENURED_FREEBYTES", "TENURED_TOTALBYTES", "TENURED_PERCENT",
           "TENURED_SOA_FREEBYTES", "TENURED_SOA_TOTALBYTES", "TENURED_SOA_PERCENT",
           "TENURED_LOA_FREEBYTES", "TENURED_LOA_TOTALBYTES", "TENURED_LOA_PERCENT" ]

  String xmlStr = data.collect{ it[1] }.join()

  def double stopTime = 0;
  
  def xml = new XmlParser().parseText(xmlStr)
  data = []
  xml.af.each
  {
    try
    {
      stopTime += Double.parseDouble(it.time.'@totalms'?.text().toString())
    }
    catch (Exception ex) {}
    
    def row =
    [
      
      it.'@id', it.'@type', it.'@intervalms',
      it.time.'@totalms'?.text(), stopTime, 
      it.gc.'@type'?.text(), it.gc.'@totalid'?.text(),
      it.gc.flipped.'@objectcount'?.text(), it.gc.flipped.'@bytes'?.text(),
      it.gc.tenured.'@objectcount'?.text(), it.gc.tenured.'@bytes'?.text(),
      it.gc.finalization.'@objectsqueued'?.text(),
      it.gc.scavenger.'@tiltratio'?.text(),
      it.gc.nursery.'@freebytes'?.text(), it.gc.nursery.'@totalbytes'?.text(),
      it.gc.nursery.'@percent'?.text(), it.gc.nursery.'@tenureage'?.text(),
      it.gc.tenured.'@freebytes'?.text(), it.gc.tenured.'@totalbytes'?.text(),
      it.gc.tenured.'@percent'?.text(),
      it.gc.tenured.soa.'@freebytes'?.text(), it.gc.tenured.soa.'@totalbytes'?.text(),
      it.gc.tenured.soa.'@percent'?.text(),
      it.gc.tenured.loa.'@freebytes'?.text(), it.gc.tenured.loa.'@totalbytes'?.text(),
      it.gc.tenured.loa.'@percent'?.text(),
    ]

    data << row
  }