package com.dexvis.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Modifier;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.jar.JarEntry;
import java.util.jar.JarInputStream;
import java.util.stream.Stream;

import com.dexvis.dex.wf.DexTask;
import com.google.common.reflect.ClassPath.ClassInfo;

public class ClassPathUtil
{
  // Find task classes via the following conventions:
  //
  // 1) Have the pattern "dex" and "task" in the name.
  // 2) Are assignment compatible with the DexTask interface.
  // 3) Are not abstract or an interface.
  final static Predicate<ClassInfo> isDexTask = (final ClassInfo ci) -> {
                                                if (ci == null
                                                    || ci.getName().indexOf(
                                                        "task") <= 0
                                                    || ci.getName().indexOf(
                                                        "dex") <= 0)
                                                {
                                                  return false;
                                                }
                                                Class<?> clzz = ci.load();
                                                return clzz != null
                                                    && DexTask.class
                                                        .isAssignableFrom(clzz)
                                                    && !Modifier
                                                        .isAbstract(clzz
                                                            .getModifiers())
                                                    && !Modifier
                                                        .isInterface(clzz
                                                            .getModifiers());
                                              };

  public static List<String> getClasses()
  {
    return getClasses(ClassLoader.getSystemClassLoader());
  }

  public static List<String> getClasses(ClassLoader cl)
  {
    List<String> classList = new ArrayList<String>();
    for (String classpathEntry : System.getProperty("java.class.path").split(
        System.getProperty("path.separator")))
    {
      if (classpathEntry.endsWith(".jar"))
      {
        File jar = new File(classpathEntry);

        JarInputStream is;
        try
        {
          is = new JarInputStream(new FileInputStream(jar));

          JarEntry entry;
          while ((entry = is.getNextJarEntry()) != null)
          {
            if (entry.getName().endsWith(".class"))
            {
              classList.add(entry.getName().replace('/', '.'));
            }
          }
        }
        catch(IOException ioEx)
        {
          ioEx.printStackTrace();
        }
      }
      else
      {
        // System.out.println("CPE: " + classpathEntry);
        File file = new File(classpathEntry);
        if (file.isDirectory())
        {
          listFiles(file.toPath())
              .map(
                  (path) -> {
                    if (path.toString().startsWith(file.toString()))
                    {
                      return path.toString()
                          .substring(file.toString().length() + 1)
                          .replaceAll("[/\\\\/]", ".");
                    }
                    else
                    {
                      return path.toString().replaceAll("[/\\\\/]", ".");
                    }
                  }).filter(path -> path.endsWith(".class"))
              .forEach(path -> classList.add(path));
        }
      }
    }
    return classList;
  }

  static Stream<Path> listFiles(Path path)
  {
    if (Files.isDirectory(path))
    {
      try
      {
        return Files.list(path).flatMap(ClassPathUtil::listFiles);
      }
      catch(Exception e)
      {
        return Stream.empty();
      }
    }
    else
    {
      return Stream.of(path);
    }
  }

  public static void main(String args[])
  {
    getClasses().stream().filter(name -> name.indexOf("task") >= 0)
        .filter(path -> path.indexOf('$') == -1)
        .map(path -> path.substring(0, path.length() - 6));
  }
}