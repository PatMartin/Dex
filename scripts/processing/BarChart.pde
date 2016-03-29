// An array to keep track of how often random numbers are picked
float[] randomCounts;
float maxValue;
float minValue;

void setup()
{
  size(800,800);

  maxValue = float(dexData[0][0]);
  minValue = float(dexData[0][0]);
  
  for (int ri=0;ri<dexData.length;ri++)
  {
    for (int ci=0; ci<dexHeader.length; ci++)
    {
      maxValue = max(maxValue, float(dexData[ri][ci]));
      minValue = min(minValue, float(dexData[ri][ci]));
    }
  }
}

float rescale(float val, float minValue, float maxValue)
{
  // Create 0-1 normalized:
  float norm = (val - minValue) / (maxValue - minValue);
  println(height * norm);
  return height * norm;
}

// 0-10 -> 0-100 : 5 -> 50 = 

void draw()
{
  background(255);
  
  // Draw a rectangle to graph results
  stroke(0);
  strokeWeight(2);
  fill(127);

  int w = width/dexHeader.length;

  for (int ri=0; ri<dexData.length;ri++)
  {
    for (int ci=0; ci<dexHeader.length; ci++)
    {
      rect(ri*w, height - rescale(float(dexData[ri][ci]), minValue, maxValue), w,
           rescale(float(dexData[ri][ci]), minValue, maxValue));
    }
  }
}
