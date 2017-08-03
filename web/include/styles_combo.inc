<style>
  html,body,.layout-container,#ChartArea1, #ChartArea2{
    height : 100%;
    min-height : 100%;
    width : 100%;
    min-width : 100%;
  }
  
  #ChartArea1 {
    display: inline-block;
  }
  
  #ChartArea2 {
    display: inline-block;
  }
  
  #ConfigurationPane, {
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
  }
<%
  println new File("javascript/jquery-ui/latest/jquery-ui.min.css").text
  println new File("javascript/jquery-ui/latest/jquery-ui.theme.min.css").text
  println new File("javascript/dexjs/latest/dex-jquery.css").text
  println new File("javascript/bootstrap3/latest/bootstrap.min.css").text
  println new File("javascript/dexjs/latest/dex-bootstrap.css").text
  println new File("javascript/dexjs/latest/dex.css").text
%>
</style>