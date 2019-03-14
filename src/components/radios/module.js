import React from 'react';
import type { ClasssNames } from './template';

// TODO: how to type import?
import styles from './styles.module.scss';
import Template from './template';

export default props => <Template classNames={styles} {...props} />;
