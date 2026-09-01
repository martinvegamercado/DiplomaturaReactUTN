

export function NovedadItem(props) {

    const {title, subtitle, author, body} = props


  return (
    <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>{body}</p>
        <h5>{author}</h5>
    </div>
  )
}
