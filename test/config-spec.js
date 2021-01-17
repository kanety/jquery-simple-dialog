describe('jquery-simple-dialog', () => {
  it('config', () => {
    let defaults = $.SimpleDialog.getDefaults();
    expect(defaults.focus).toEqual(null);

    defaults = $.SimpleDialog.setDefaults({focus: '#elem'});
    expect(defaults.focus).toEqual('#elem');
  });
});
