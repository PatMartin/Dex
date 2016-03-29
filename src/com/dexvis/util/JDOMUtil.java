package com.dexvis.util;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.util.Iterator;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.filter.ElementFilter;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class JDOMUtil
{
  private static XMLOutputter xmlOut     = new XMLOutputter(Format
                                             .getPrettyFormat());
  private static XMLOutputter compactOut = new XMLOutputter(Format
                                             .getCompactFormat());

  /**
   * 
   * This method will traverse an xml document and remove namespaces from each
   * element within the document.
   * 
   * @param doc
   *          The document we are removing namespaces from.
   * 
   */
  public static void removeNamespaces(Document doc)
  {
    Iterator it = doc.getRootElement().getDescendants(new ElementFilter());
    doc.getRootElement().setNamespace(null);

    while (it.hasNext())
    {
      Element docElt = (Element) it.next();
      if (docElt.getNamespace() != null)
        docElt.setNamespace(null);
    }
  }

  public static String toString(Element elt)
  {
    if (elt != null)
    {
      return xmlOut.outputString(elt);
    }
    else
    {
      return "";
    }
  }

  public static String toString(Document doc)
  {
    if (doc != null)
    {
      return xmlOut.outputString(doc);
    }
    else
    {
      return "";
    }
  }

  public static String toCompactString(Element elt)
  {
    if (elt != null)
    {
      return compactOut.outputString(elt);
    }
    else
    {
      return "";
    }
  }

  public static String toCompactString(Document doc)
  {
    if (doc != null)
    {
      return compactOut.outputString(doc);
    }
    else
    {
      return "";
    }
  }

  public static void prettyPrint(Element elt, Writer out)
  {
    try
    {
      xmlOut.output(elt, out);
    }
    catch(IOException ioEx)
    {
      ioEx.printStackTrace(System.err);
    }
  }

  public static void prettyPrint(Document doc, Writer out)
  {
    try
    {
      xmlOut.output(doc, out);
    }
    catch(IOException ioEx)
    {
      ioEx.printStackTrace(System.err);
    }
  }

  public static void prettyPrint(Element elt, OutputStream out)
  {
    try
    {
      xmlOut.output(elt, out);
    }
    catch(IOException ioEx)
    {
      ioEx.printStackTrace(System.err);
    }
  }

  public static void prettyPrint(Document doc, OutputStream out)
  {
    try
    {
      xmlOut.output(doc, out);
    }
    catch(IOException ioEx)
    {
      ioEx.printStackTrace(System.err);
    }
  }

  public static void prettyPrint(Element elt)
  {
    prettyPrint(elt, System.out);
  }

  public static void prettyPrint(Document doc)
  {
    prettyPrint(doc, System.out);
  }
}
