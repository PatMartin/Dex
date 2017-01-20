package com.dexvis.dex.wf;

import com.dexvis.dex.exception.DexException;

public class DexJobScheduler
{
  public DexJobState execute(DexJob job) throws DexException
  {
    return job.execute();
  }

  public void terminate(DexJob job) throws DexException
  {
    job.terminate();
  }
  
  public DexJobState start(DexJob job) throws DexException
  {
    return job.start();
  }
}
