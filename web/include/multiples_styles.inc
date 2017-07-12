<style>
    ul {
        list-style-type: none;
    }

    li {
        list-style: none;
        font-weight: bold;
    }

    #widget-table {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        table-layout: fixed !important;
    }

    #widget-header-row {
        width: 100%;
        height: 20px;
    }

    #widget-header {
        width: 100%;
        height: 20px;
        background-color: #4f934e;
        color: white;
    }

    #widget-content {
        width: 100%;
        height: 100%;
    }
    
    #widget-content div {
        width: 100%;
        height: 100%;
    }

    .btn:hover {
        opacity: .7 !important;
    }

    .gridster {
        width: 100%;
        height: 100%;
    }

    .gridster .gs-w {
        background: white;
        cursor: pointer;
        -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        overflow: hidden;
    }

    .gridster .player {
        -webkit-box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
        background: #BBB;
    }

    .gridster .preview-holder {
        border: none !important;
        border-radius: 0 !important;
        background: red !important;
    }

    .gridster ul {
        background-color: #EFEFEF;
        padding-left: 0px;
        width: 100% !important;
        min-height: 100px !important;
    }

    .gridster li {
        font-size: 1em;
        font-weight: bold;
        text-align: center;
        line-height: 100%;
    }

    ul {
        list-style-type: none;
    }

    li {
        list-style: none;
        font-weight: bold;
    }
<%
  println new File("javascript/gridster/latest/jquery.gridster.min.css").text
%>
</style>