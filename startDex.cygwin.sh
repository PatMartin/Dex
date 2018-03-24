# JAVA needs to be version 1.8 or better.

CP="Dex.jar;`find lib -name \*.jar | xargs echo | sed 's/ /;/g'`"
java -Xmx2g -Xms1g -cp $CP com.dexvis.dex.Dex