package com.dexvis.dex;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.dexvis.dex.exception.DexException;
import com.dexvis.util.ArrayUtil;
import com.dexvis.util.XStreamUtil;

public class DexModel
{
  private String type = "Unknown";
  private List<String> features = new ArrayList<String>();
  private List<String> featureTypes = new ArrayList<String>();
  private Object model = null;
  private Map<String, Object> properties = new HashMap<String, Object>();
  
  public DexModel(String type, List<String> features,
      List<String> featureTypes, Object model) throws DexException
  {
    this(type, features, featureTypes, model, null);
  }
  
  public DexModel(String type, List<String> features,
      List<String> featureTypes, Object model, Map<String, Object> properties)
      throws DexException
  {
    setType(type);
    setFeatures(features);
    setFeatureTypes(featureTypes);
    setModel(model);
    setProperties(properties);
    validate();
  }
  
  public void validate() throws DexException
  {
    List<String> problems = new ArrayList<String>();
    if (type == null || type.length() <= 0)
    {
      problems.add("Model type cannot be null or of length 0");
    }
    if (features == null || features.size() <= 0)
    {
      problems.add("Features cannot be empty.");
    }
    if (featureTypes == null || featureTypes.size() <= 0)
    {
      problems.add("Feature Types cannot be empty.");
    }
    if (features != null && featureTypes != null
        && features.size() != featureTypes.size())
    {
      problems.add("Feature length of " + features.size()
          + " is not equal to Feature types length of " + featureTypes.size());
    }
    if (model == null)
    {
      problems.add("Model cannot be null.");
    }
    
    // If there were problems, return an explanation with all problems found.
    if (problems.size() > 0)
    {
      throw new DexException(ArrayUtil.join("\n",
          problems.toArray(new String[problems.size()])));
    }
  }
  
  public void write(String filePath) throws IOException
  {
    XStreamUtil.writeObjects(filePath, getType(), getFeatures(),
        getFeatureTypes(), getModel(), getProperties());
  }
  
  public static DexModel read(String filePath) throws ClassNotFoundException,
      DexException
  {
    try
    {
      List<Object> objs = XStreamUtil.readObjects(filePath);
      System.out.println("READ: " + objs.size());
      return new DexModel((String) objs.get(0), (List<String>) objs.get(1),
          (List<String>) objs.get(2), objs.get(3),
          (Map<String, Object>) objs.get(4));
    }
    catch(IOException ioEx)
    {
      throw new DexException("Could not read model from file: '" + filePath
          + "'");
    }
  }
  
  public String getType()
  {
    return type;
  }
  
  public void setType(String type)
  {
    this.type = type;
  }
  
  public List<String> getFeatures()
  {
    return features;
  }
  
  // Simplifies serialization
  public void setFeatures(List<String> features)
  {
    this.features = new ArrayList<String>();
    if (features != null)
    {
      for (String feature : features)
      {
        this.features.add(feature);
      }
    }
  }
  
  public List<String> getFeatureTypes()
  {
    return featureTypes;
  }
  
  // Simplifies serialization
  public void setFeatureTypes(List<String> featureTypes)
  {
    this.featureTypes = new ArrayList<String>();
    if (featureTypes != null)
    {
      for (String featureType : featureTypes)
      {
        this.featureTypes.add(featureType);
      }
    }
  }
  
  public Object getModel()
  {
    return model;
  }
  
  public void setModel(Object model)
  {
    this.model = model;
  }
  
  public Map<String, Object> getProperties()
  {
    return properties;
  }
  
  public void setProperties(Map<String, Object> properties)
  {
    if (properties != null)
    {
      this.properties = properties;
    }
    else
    {
      this.properties = new HashMap<String, Object>();
    }
  }
}
