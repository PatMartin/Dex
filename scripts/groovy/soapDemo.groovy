import groovy.swing.SwingBuilder
import groovy.net.soap.SoapClient

proxy = new SoapClient("http://www.webservicex.net/CurrencyConvertor.asmx?WSDL")

def currency = ['USD', 'EUR', 'CAD', 'GBP', 'AUD']
def rate = 0.0

swing = new SwingBuilder()

refresh = swing.action(
  name:'Refresh',
  closure:this.&refreshText,
  mnemonic:'R'
)

frame = swing.frame(title:'Currency Demo') {
  panel {
    label 'Currency rate from '
    comboBox(id:'from', items:currency)
    label ' to '
    comboBox(id:'to', items:currency)
    label ' is '
    textField(id:'currency', columns:10, rate.toString())
    button(text:'Go !', action:refresh)
  }
}
frame.pack()
frame.show()

def refreshText(event) {
  rate = proxy.ConversionRate(swing.from.getSelectedItem(), swing.to.getSelectedItem())
  swing.currency.text = rate
}