import L from 'leaflet'

class builder extends L.Routing.ItineraryBuilder {
  createContainer(className?: string | undefined): HTMLElement {
    var table = L.DomUtil.create('div', className || '')
    return table;
  }

  createStepsContainer(): HTMLElement {
    return L.DomUtil.create('div')
  }

  createStep(text: string, distance: string, icon: string, steps: HTMLElement): HTMLTableRowElement {
    let row = L.DomUtil.create('tr')
    return row;
  }
}
export default builder