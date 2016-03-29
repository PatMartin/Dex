package com.dexvis.dex.wf;

import com.dexvis.dex.exception.DexException;

public class DexJobScheduler
{
  public DexJobState initialize(DexJob job) throws DexException
  {
    return job.initialize();
  }

  public DexJobState execute(DexJob job) throws DexException
  {
    return job.execute();
  }

  public DexJobState terminate(DexJob job) throws DexException
  {
    return job.terminate();
  }

  public DexJobState suspend(DexJob job) throws DexException
  {
    return job.suspend();
  }
  
  public DexJobState start(DexJob job) throws DexException
  {
    return job.start();
  }
}
