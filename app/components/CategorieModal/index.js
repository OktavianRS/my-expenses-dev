/**
*
* CategorieModal
*
*/

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

function CategorieModal(props, context) {
  const submit = () => {
    context.createCategory({ name: 'value' });
  };

  return (
    <div>
      <Dialog
        title="Dialog With Actions"
        actions={[
          <FlatButton
            label="Cancel"
            primary
            onTouchTap={context.handelCategorieModal}
          />,
          <FlatButton
            label="Submit"
            primary
            keyboardFocused
            onTouchTap={submit}
          />,
        ]}
        modal={false}
        open={context.openCategorieModal}
        onRequestClose={context.handelCategorieModal}
      >
        <TextField
          hintText="Create new category"
          errorText="This field is required"
        />
      </Dialog>
    </div>
  );
}

CategorieModal.contextTypes = {
  openCategorieModal: React.PropTypes.bool,
  handelCategorieModal: React.PropTypes.func,
  createCategory: React.PropTypes.func,
};

export default CategorieModal;
