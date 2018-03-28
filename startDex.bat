@echo off
 setLocal EnableDelayedExpansion
 set CLASSPATH="
 for /R ./lib %%a in (*.jar) do (
   set CLASSPATH=!CLASSPATH!;%%a
 )
 set CLASSPATH=!CLASSPATH!"
 echo !CLASSPATH!
 java -Xmx2g -Xmx1g -cp Dex.jar;%%CLASSPATH%% com.dexvis.dex.Dex