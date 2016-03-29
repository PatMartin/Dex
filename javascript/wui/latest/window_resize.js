function doResize()
{
this.w=win.width;
this.h=win.height;
dvGoalStructure=dojo.byId("dvGoalStructure");
dvGoalStructure.style.height=this.h;
dvGoalStructure.style.width=this.w;
svgGoals=dojo.byId("svgGoals")
svgGoals.width=this.w;
svgGoals.height=this.h;
force.size([this.w,this.h]);
force.start();
force.resume();
} 