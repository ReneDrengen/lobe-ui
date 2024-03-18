'use client';

import { createStyles } from 'antd-style';
import { FC, PropsWithChildren } from 'react';
import { Flexbox, type FlexboxProps } from 'react-layout-kit';

import A from '@/A';
import Grid from '@/Grid';
import Icon, { type IconProps } from '@/Icon';
import Img from '@/Img';

const useStyles = createStyles(({ css, cx, token }) => {
  const icon = cx(css`
    margin-block: 0.1em;
    opacity: 0.5;
    transition: opacity 0.2s ${token.motionEaseInOut};
  `);

  return {
    card: css`
      --lobe-markdown-header-multiple: 0;
      --lobe-markdown-margin-multiple: 1;

      overflow: hidden;

      height: 100%;

      color: ${token.colorText};

      border-radius: calc(var(--lobe-markdown-border-radius) * 1px);
      box-shadow: 0 0 0 1px var(--lobe-markdown-border-color);

      transition: all 0.2s ${token.motionEaseInOut};

      h3,
      p {
        margin-block: 0;
      }

      p {
        color: ${token.colorTextDescription};
        transition: color 0.2s ${token.motionEaseInOut};
      }

      &:hover {
        background: ${token.colorFillQuaternary};
        box-shadow: 0 0 0 1px ${token.colorBorder};

        p {
          color: ${token.colorTextSecondary};
        }

        .${icon} {
          opacity: 1;
        }
      }
    `,

    container: css`
      margin-block: calc(var(--lobe-markdown-margin-multiple) * 1em);

      > div {
        margin: 0 !important;
      }
    `,
    content: css`
      gap: 0.75em;
      padding: 1em;
    `,
    icon,
  };
});

export interface CardProps extends Omit<FlexboxProps, 'children'> {
  desc?: string;
  href?: string;
  icon?: IconProps['icon'];
  iconProps?: Omit<IconProps, 'icon'>;
  image?: string;
  title: string;
}

const Card: FC<CardProps> = ({ icon, title, desc, href, iconProps, image, ...rest }) => {
  const { styles } = useStyles();

  return (
    <A href={href}>
      <Flexbox align={'flex-start'} className={styles.card} {...rest}>
        {image && (
          <Img
            alt={title}
            height={100}
            src={image}
            style={{ height: 'auto', width: '100%' }}
            width={250}
          />
        )}

        <Flexbox align={'flex-start'} className={styles.content} horizontal {...rest}>
          {!image && icon && (
            <Icon className={styles.icon} icon={icon} size={{ fontSize: '1.5em' }} {...iconProps} />
          )}
          <div>
            <h3>{title}</h3>
            {desc && <p>{desc}</p>}
          </div>
        </Flexbox>
      </Flexbox>
    </A>
  );
};

interface _CardsProps extends PropsWithChildren {
  maxItemWidth?: string | number;
  rows?: number;
}

const _Cards: FC<_CardsProps> = ({ children, maxItemWidth = 250, rows = 3 }) => {
  const { styles } = useStyles();
  return (
    <Grid className={styles.container} maxItemWidth={maxItemWidth} rows={rows}>
      {children}
    </Grid>
  );
};

export type CardsProps = typeof _Cards & {
  Card: typeof Card;
};

const Cards = _Cards as CardsProps;
Cards.Card = Card;

export default Cards;
