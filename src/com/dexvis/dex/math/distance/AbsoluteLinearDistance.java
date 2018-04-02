package com.dexvis.dex.math.distance;

public class AbsoluteLinearDistance implements smile.math.distance.Distance<double []>
{
  public double d(double[] a, double[] b)
  {
    double distance = 0.0;
    if (a != null && b != null && a.length == b.length) {
      for (int i=0; i<a.length; i++) {
        distance += Math.abs(a[i] - b[i]);
      }
    }

    System.out.println("Abs-Linear-Distance: " + distance);
    return distance;
  }
  
}
