package com.dexvis.dex.task.tablemanipulation

import javafx.scene.image.Image

import org.simpleframework.xml.Root

import com.dexvis.dex.exception.DexException
import com.dexvis.dex.wf.DexTask
import com.dexvis.dex.wf.DexTaskState

/**
 * 
 * This task will add a column to the current table.
 * 
 * @author Patrick Martin
 *
 */
@Root
class TrimColumns extends DexTask
{
  /**
   * 
   * Override the default constructor to provide this component's name, category and help file.
   * Report that it has been constructed.
   * 
   */
  public TrimColumns()
  {
    super("Table Manipulation", "Trim Columns",
      "table_manipulation/TrimColumns.html")
  }

  public DexTaskState execute(DexTaskState state) throws DexException
  {
    state.dexData.header = state.dexData.header.collect
    { header ->
      header.trim()
    }

    state.dexData.data = state.dexData.data.collect
    { row ->
      row.collect
      { col -> col.trim() }
    }

    return state
  }
}
