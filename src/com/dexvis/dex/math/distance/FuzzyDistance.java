package com.dexvis.dex.math.distance;

public class FuzzyDistance implements smile.math.distance.Distance<double[]>
{
  private smile.math.distance.Distance distanceFn = null;
  private int fuzziness = 0;
  
  public FuzzyDistance(smile.math.distance.Distance distanceFn, int fuzziness)
  {
    this.distanceFn = distanceFn;
    this.fuzziness = (fuzziness > 0) ? fuzziness : 0;
  }
  
  public double d(double[] a, double[] b)
  {
    double distance = 0.0;
    
    distance = distanceFn.d(a, b);
    double fuzzyDistance = distance;
    
    //System.out.println("Fuzziness: " + fuzziness + ", a.length: " + a.length);
    
    if (fuzziness < a.length)
    {
      for (int num2Skip = 1; num2Skip <= fuzziness; num2Skip++)
      {
        double a1[] = new double[a.length-num2Skip];
        double b1[] = new double[b.length-num2Skip];

        System.arraycopy(a, num2Skip, a1, 0, a.length-num2Skip);
        System.arraycopy(b, 0, b1, 0, b.length-num2Skip);

        // fuzzy distance on subset of the data
        fuzzyDistance = distanceFn.d(a1, b1);
        // Get average distance between a,b elements.
        double avgDistance = fuzzyDistance / (a.length-num2Skip);
        fuzzyDistance += avgDistance * num2Skip;
        //System.out.println("Distance: " + distance + ", Fuzzy Distance: " + fuzzyDistance);
        distance = Math.min(distance, fuzzyDistance);
      }
    }
    
    //System.out.println("Fuzzy Distance: " + distance);
    return distance;
  }
}
