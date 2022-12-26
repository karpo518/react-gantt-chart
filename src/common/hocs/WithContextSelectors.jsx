import { useContext } from "react"

export function WithContextSelectors(Component) { 
  
  this.displayName = `WithContextSelectors(${getDisplayName(Component)})`

  return (props) => {
    const {context, selectors, ...restProps} = props
    
    console.log(`Render or ${getDisplayName(Component)}`)
    const state = useContext(context)
    let contextProps = {}
    Object.keys(selectors).forEach(propName => {
      contextProps[propName] = selectors[propName](state)
    })

    let componentProps = {...contextProps, ...restProps}

    return <Component {...componentProps} />
  }
}

