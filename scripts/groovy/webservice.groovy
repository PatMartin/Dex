@Grab(group='org.codehaus.groovy.modules', module='groovyws', version='0.5.2')
import groovyx.net.ws.WSClient

proxy = new WSClient("http://www.w3schools.com/webservices/tempconvert.asmx?WSDL", this.class.classLoader)
proxy.initialize()

result = proxy.CelsiusToFahrenheit(0)
println "You are probably freezing at ${result} degrees Farhenheit"