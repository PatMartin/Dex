package com.dexvis.dex.math.distance;

public class AggregateDistance implements
    smile.math.distance.Distance<double[]>
{
  private smile.math.distance.Distance distanceFn = null;
  
  private double maxDistance = 0.0;
  private double minDistance = Double.MAX_VALUE;
  
  public AggregateDistance(smile.math.distance.Distance distanceFn)
  {
    this.distanceFn = distanceFn;
  }
  
  public double d(double[] a, double[] b)
  {
    double distance = 0.0;

    distance = distanceFn.d(a, b);
    if (distance > maxDistance)
    {
      maxDistance = distance;
    }
    
    if (distance < minDistance)
    {
      minDistance = distance;
    }
    
    //System.out.println("Aggregate Distance: " + distance);
    return distance;
  }
  
  public double getMinDistance()
  {
    return this.minDistance;
  }
  
  public double getMaxDistance()
  {
    return this.maxDistance;
  }
  
}
