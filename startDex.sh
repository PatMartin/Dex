# JAVA needs to be version 1.7u6 or better.

CP="Dex.jar:`find lib -name \*.jar | xargs echo | sed 's/ /:/g'`"
java -Xmx1024m -Xms1024m -cp $CP com.javafx.main.Main