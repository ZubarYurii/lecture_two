import { createElement } from '../helpers/domHelper';


export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.

  
 function createPreviewImage(source) {
    const attributes = { src: source };
    const imgElement = createElement({
      tagName: 'img',
      className: 'fighter-preview___image',
      attributes
    });
  
    return imgElement;
  }

if(fighter) {
    const keyValueArrayOfObject = Object.entries(fighter);
    fighterElement.append(createPreviewImage(fighter['source']));
 console.log(keyValueArrayOfObject)
}
  


 

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
5
