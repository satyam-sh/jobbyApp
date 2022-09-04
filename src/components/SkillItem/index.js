import './index.css'

const SkillItem = props => {
  const {detail} = props

  return (
    <li className="skill-items">
      <img src={detail.image_url} alt={detail.name} className="skill-image" />
      <p className="skill-text">{detail.name}</p>
    </li>
  )
}
export default SkillItem
