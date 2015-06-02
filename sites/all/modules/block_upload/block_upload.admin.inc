<?php

/**
 * Module configuration form.
 * Blocks count selector.
 * @param type $form
 * @param type $form_state
 * @return type
 */
function block_upload_settings_form($form, &$form_state) {
  $form['block_upload_blocks_count'] = array(
    '#type' => 'select',
    '#title' => t('Blocks count'),
    '#options' => drupal_map_assoc(range(1,10)),
    '#default_value' => array(variable_get('block_upload_blocks_count', 1)),
  );
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );
  return $form;
}

/**
 * Save blocks count setting.
 * @param type $form
 * @param type $form_state
 */
function block_upload_settings_form_submit($form, &$form_state) {
  variable_set('block_upload_blocks_count', $form_state['values']['block_upload_blocks_count']);
  drupal_set_message(t('Settings saved'));
}
