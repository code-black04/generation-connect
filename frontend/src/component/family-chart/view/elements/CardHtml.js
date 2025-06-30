import d3 from "../../d3.js"
import {personSvgIcon, miniTreeSvgIcon, plusSvgIcon} from "./Card.icons.js"

export function CardHtml(props) {
  const cardInner = props.style === 'default' ? cardInnerDefault 
  : props.style === 'imageCircleRect' ? cardInnerImageCircleRect
  : props.style === 'imageCircle' ? cardInnerImageCircle 
  : props.style === 'imageRect' ? cardInnerImageRect
  : props.style === 'rect' ? cardInnerRect
  : cardInnerDefault

  return function (d) {
    this.innerHTML = (`
    <div class="card ${getClassList(d).join(' ')}" data-id="${d.data.id}" style="transform: translate(-50%, -50%); pointer-events: auto;">
      ${props.mini_tree ? getMiniTree(d) : ''}
      ${cardInner(d)}
    </div>
    `)
    this.querySelector('.card').addEventListener('click', e => props.onCardClick(e, d))
    this.querySelector('.profile-avatar').addEventListener('click', e => props.onProfileButtonClick(e, d))
    if (props.onCardUpdate) props.onCardUpdate.call(this, d)

    if (props.onCardMouseenter) d3.select(this).select('.card').on('mouseenter', e => props.onCardMouseenter(e, d))
    if (props.onCardMouseleave) d3.select(this).select('.card').on('mouseleave', e => props.onCardMouseleave(e, d))
  }

  function getCardInnerImageCircle(d) {
    return (`
    <div class="card-inner card-image-circle" ${getCardStyle()}>
      ${d.data.data.avatar ? `<img src="${d.data.data["avatar"]}" ${getCardImageStyle()}>` : noImageIcon(d)}
      <div class="card-label">${textDisplay(d)}</div>
    </div>
    `)
  }

  function profileButton() {
      const card_dim = {w:220,h:70,text_x:75,text_y:15,img_w:60,img_h:60,img_x:5,img_y:5}
      const top = card_dim.h - 20;
      const left = card_dim.w - 40;

      return (`
         <div class="profile-button"
     style="
       position: absolute;
       top: ${top}px;
       left: ${left}px;
       width: 24px;
       height: 24px;
       background-color: white;
       border-radius: 50%;
       display: flex;
       align-items: center;
       justify-content: center;
       cursor: pointer;
       border: 1px solid #aaa;
     ">
  <svg xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 24 24"
       fill="black"
       width="14px"
       height="14px">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 1.6c-3.2 0-9.6 1.6-9.6 4.8v1.6h19.2v-1.6c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
</div>

      `);
    }

  function getCardInnerImageRect(d) {
    return (`
    <div class="card-inner card-image-rect" ${getCardStyle()}>
      <div class="profile-avatar">
      ${d.data.data.avatar ? `<img src="${d.data.data["avatar"]}" ${getCardImageStyle()}>` : noImageIcon(d)}
      </div>
      <div class="card-label">${textDisplay(d)}</div>
    </div>
    `)
  }

  function getCardInnerRect(d) {
    return (`
    <div class="card-inner card-rect" ${getCardStyle()}>
      ${textDisplay(d)}
    </div>
    `)
  }

  function textDisplay(d) {
    if (d.data._new_rel_data) return newRelDataDisplay(d)
    if (d.data.to_add) return `<div>${props.empty_card_label || 'ADD'}</div>`
    return (`
      ${props.card_display.map(display => `<div>${display(d.data)}</div>`).join('')}
    `)
  }

  function newRelDataDisplay(d) {
    const attr_list = []
    attr_list.push(`data-rel-type="${d.data._new_rel_data.rel_type}"`)
    if (['son', 'daughter'].includes(d.data._new_rel_data.rel_type)) attr_list.push(`data-other-parent-id="${d.data._new_rel_data.other_parent_id}"`)
    return `<div ${attr_list.join(' ')}>${d.data._new_rel_data.label}</div>`
  }

  function getMiniTree(d) {
    if (!props.mini_tree) return ''
    if (d.data.to_add) return ''
    if (d.data._new_rel_data) return ''
    if (d.all_rels_displayed) return ''
    return `<div class="mini-tree">${miniTreeSvgIcon()}</div>`
  }

  function cardInnerImageCircleRect(d) {
    return d.data.data.avatar ? cardInnerImageCircle(d) : cardInnerRect(d)
  }

  function cardInnerDefault(d) {
    return getCardInnerImageRect(d)
  }

  function cardInnerImageCircle(d) {
    return getCardInnerImageCircle(d)
  }

  function cardInnerImageRect(d) {
    return getCardInnerImageRect(d)
  }

  function cardInnerRect(d) {
    return getCardInnerRect(d)
  }

  function getClassList(d) {
    const class_list = []
    if (d.data.data.gender === 'M') class_list.push('card-male')
    else if (d.data.data.gender === 'F') class_list.push('card-female')
    else class_list.push('card-genderless')

    if (d.data.main) class_list.push('card-main')

    if (d.data._new_rel_data) class_list.push('card-new-rel')

    if (d.data.to_add) class_list.push('card-to-add')

    return class_list
  }

  function getCardStyle() {
    let style = 'style="'
    if (props.card_dim.w || props.card_dim.h) {
      style += `width: ${props.card_dim.w}px; min-height: ${props.card_dim.h}px;`
      if (props.card_dim.height_auto) style += 'height: auto;'
      else style += `height: ${props.card_dim.h}px;`
    } else {
      return ''
    }
    style += '"'
    return style
  }

  function getCardImageStyle() {
    let style = 'style="position: relative;'
    if (props.card_dim.img_w || props.card_dim.img_h || props.card_dim.img_x || props.card_dim.img_y) {
      style += `width: ${props.card_dim.img_w}px; height: ${props.card_dim.img_h}px;`
      style += `left: ${props.card_dim.img_x}px; top: ${props.card_dim.img_y}px;`
    } else {
      return ''
    }
    style += '"'
    return style
  }

  function noImageIcon(d) {
    if (d.data._new_rel_data) return `<div class="person-icon" ${getCardImageStyle()}>${plusSvgIcon()}</div>`
    return `<div class="person-icon" ${getCardImageStyle()}>${personSvgIcon()}</div>`
  }
}
