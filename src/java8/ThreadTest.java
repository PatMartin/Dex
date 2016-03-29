package java8;


public class ThreadTest
{
  public static void main(String args[])
  {
    System.out.println("Hello World");
    Thread threads[] = new Thread[10];
    for (int i = 0; i < threads.length; i++)
    {
      final int myI = i;
      Runnable r = () -> {
        for (int j = 0; j < 1000; j++)
        {
          System.out.println("Runnable " + myI + " : " + j);

          try
          {
            Thread.sleep(10);
          }
          catch(InterruptedException e)
          {
            // TODO Auto-generated catch block
            e.printStackTrace();
          }
        }
      };
      
      threads[i] = new Thread(r);
    }
    
    for (int i = 0; i < threads.length; i++)
    {
      threads[i].start();
    }
    for (int i=0; i<threads.length; i++)
    {
      try
      {
        threads[i].join();
      }
      catch(InterruptedException e)
      {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
    }
  }
}
