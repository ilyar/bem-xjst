var inherits = require('inherits');
var Match = require('../bemxjst/match').Match;
var BemxjstEntity = require('../bemxjst/entity').Entity;

/**
 * @class Entity
 * @param {BEMXJST} bemxjst
 * @param {String} block
 * @param {String} elem
 * @param {Array} templates
 */
function Entity(bemxjst) {
  this.bemxjst = bemxjst;

  this.jsClass = null;

  // "Fast modes" about HTML
  this.tag = new Match(this, 'tag');
  this.attrs = new Match(this, 'attrs');
  this.bem = new Match(this, 'bem');
  this.cls = new Match(this, 'cls');

  BemxjstEntity.apply(this, arguments);
}

inherits(Entity, BemxjstEntity);
exports.Entity = Entity;

Entity.prototype.init = function init(block, elem) {
  this.block = block;
  this.elem = elem;

  // Class for jsParams
  this.jsClass = this.bemxjst.classBuilder.build(this.block, this.elem);
};

Entity.prototype._keys = {
  tag: true,
  content: true,
  attrs: true,
  mix: true,
  js: true,
  mods: true,
  elemMods: true,
  cls: true,
  bem: true
};

Entity.prototype.defaultBody = function defaultBody(context) {
  var mods = this.mods.exec(context);
  context.mods = mods;

  var elemMods;
  if (context.ctx.elem) {
    elemMods = this.elemMods.exec(context);
    context.elemMods = elemMods;
  }

  // Notice: other modes must be after context.mods/context.elemMods changes

  return this.bemxjst.render(context,
                             this,
                             this.tag.exec(context),
                             this.js.exec(context),
                             this.bem.exec(context),
                             this.cls.exec(context),
                             this.mix.exec(context),
                             this.attrs.exec(context),
                             this.content.exec(context),
                             mods,
                             elemMods);
};
