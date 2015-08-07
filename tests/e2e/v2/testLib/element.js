module.exports.click = elementInteraction;
module.exports.check = elementValueCheck;

function elementInteraction(schema, KEY, key) {
if (!(schema.hasOwnProperty('sequence')) && !(key=='photo') && !(schema.hasOwnProperty('type') && schema.type=='array') && !(schema.hasOwnProperty('readOnly')) && !(schema.hasOwnProperty('render') && schema.render.component=='psui-textarea')) {
	if (schema.hasOwnProperty('enum') || schema.hasOwnProperty('objectLink2')) {
		element(by.model('model.obj.'+KEY+'.'+key)).$('.x-dropdown-action').click();   //select-box
		element(by.model('model.obj.'+KEY+'.'+key)).$('.x-dropdown-content-inner').all(by.css('.x-item')).get(0).click();
	} else { if (schema.hasOwnProperty('render') && (schema.render.component=="psui-datepicker")) {
				element(by.model('model.obj.'+KEY+'.'+key)).$('.x-dropdown-action').click();	//Kalendarik
				element(by.model('model.obj.'+KEY+'.'+key)).$('table').all(by.css('tr')).get(2).all(by.css('td')).get(2).click();
			} else { if (!(schema.type == 'number')) { element(by.model('model.obj.'+KEY+'.'+key)).$('input').sendKeys(KEY+' '+key);}
					else {element(by.model('model.obj.'+KEY+'.'+key)).$('input').sendKeys('6');
				}}}
}
if ((schema.hasOwnProperty('render')) && (schema.render.component=='psui-textarea')) {element(by.model('model.obj.'+KEY+'.'+key)).$('textarea').sendKeys(KEY+' '+key);}
}

function elementValueCheck(schema, KEY, key) {
	if (!(schema.hasOwnProperty('sequence')) && !(key=='photo') && !(schema.hasOwnProperty('type') && schema.type=='array') && !(schema.hasOwnProperty('readOnly'))) {
		if ((schema.hasOwnProperty('enum'))) {
			//expect(element.all(by.model('model.obj.'+KEY+'.'+key)).get(0).$('div').getText()).toEqual(schema['enum'][0]);   //select-box
			//some elements dont store information in sub element div
		} else { if (schema.hasOwnProperty('render') && (schema.render.component=="psui-datepicker")) {
					expect(element.all(by.model('model.obj.'+KEY+'.'+key)).get(0).$('div').getText()).toEqual('5.8.2015');
				} else { if (!(schema.type == 'number') && !(schema.hasOwnProperty('objectLink2')))
						{
							expect(element.all(by.model('model.obj.'+KEY+'.'+key)).get(0).$('div').getText()).toEqual(KEY+' '+key);
						} else {if (schema.type == 'number') {expect(element.all(by.model('model.obj.'+KEY+'.'+key)).get(0).$('div').getText()).toEqual('6')}}
	}}
	}
}
