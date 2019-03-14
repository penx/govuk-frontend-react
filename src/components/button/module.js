// This version of button imports styles as a CSS module and provides custom classNames to the template
import React from 'react';
import styles from './styles.module.scss';
import Template from './template';

export default props => <Template classNames={styles} {...props} />;
