package com.dexvis.util;

import java.util.concurrent.CountDownLatch;

import javafx.application.Platform;

public class ThreadUtil
{
  public static void runAndWait(Runnable action)
  {
    if (action == null)
      throw new NullPointerException("action");

    // run synchronously on JavaFX thread
    if (Platform.isFxApplicationThread())
    {
      action.run();
      return;
    }

    // queue on JavaFX thread and wait for completion
    final CountDownLatch doneLatch = new CountDownLatch(1);
    Platform.runLater(() -> {
      try
      {
        action.run();
      }
      finally
      {
        doneLatch.countDown();
      }
    });

    try
    {
      doneLatch.await();
    }
    catch(InterruptedException e)
    {
      // ignore exception
    }
  }
}
