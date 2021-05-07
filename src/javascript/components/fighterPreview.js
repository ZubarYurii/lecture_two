import { createElement } from '../helpers/domHelper';


export function createFighterPreview(fighter, position) {

  if(!fighter) {
  return;
}
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  const { source } = fighter;
  
  fighterElement.append(createFighterPreviewImage(source), createFighterProperties(fighter));

  
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    alt: name,
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

function createFighterPreviewImage(source) {
    const attributes = { src: source, width: 120, hight: 200};
    const previewImgElement = createElement({
      tagName: 'img',
      attributes
    });
  
  return previewImgElement;
}
  
function createFighterProperties(fighter) {

  const propertyList = createElement({
    tagName: 'ul'
  }
  )
const propertiesArr = Object.entries(fighter)

  const propertyItem = propertiesArr.map(item => {
    if (item[0] !== '_id' && item[0] !== 'source') {
     return `<li class="fighter-preview___properties">${item[0]}: ${item[1]} </li>`
    }
  }).join(' ')

  propertyList.innerHTML = propertyItem;
  
  return propertyList;

}

