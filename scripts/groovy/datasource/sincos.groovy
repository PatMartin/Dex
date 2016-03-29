header = [ "X", "SIN(X)", "COS(X)" ]
(-0..90).each { data << [ it, Math.sin(it*8/90.0), Math.cos(it*8/90.0) ] }

