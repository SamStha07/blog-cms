import Image from 'next/image';
import React from 'react';

export const getContentFragment = (index, text, obj, type) => {
  let modifiedText = text;
  // console.log('type', type);
  // console.log('obj', obj);
  // console.log('modified text', modifiedText);

  if (obj) {
    if (obj.bold) {
      modifiedText = (
        <b className='font-bold' key={index}>
          {text}
        </b>
      );
    }

    if (obj.italic) {
      modifiedText = <em key={index}>{text}</em>;
    }

    if (obj.underline) {
      modifiedText = <u key={index}>{text}</u>;
    }
  }

  switch (type) {
    case 'paragraph':
      return (
        <p key={index} className='mb-8'>
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </p>
      );
    case 'bulleted-list':
      return (
        <>
          {modifiedText.map((data, i) => (
            <li key={i}>{data}</li>
          ))}
        </>
      );
    case 'numbered-list':
      return (
        <ol type='1'>
          {modifiedText.map((data, i) => (
            <li key={i}>{data}</li>
          ))}
        </ol>
      );
    case 'code-block':
      return (
        <pre
          style={{ background: '#1d1f21', color: 'white', padding: '1rem' }}
          key={index}
        >
          {modifiedText.map((data, i) => (
            <code
              style={{
                wordWrap: 'break-word',
                boxDecorationBreak: 'clone',
              }}
              key={i}
            >
              {data}
            </code>
          ))}
        </pre>
      );
    case 'block-quote':
      return (
        <blockquote>
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </blockquote>
      );
    case 'heading-one':
      return (
        <h1 key={index} className='text-5xl font-semibold mb-4'>
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 key={index} className='text-4xl font-semibold mb-4'>
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 key={index} className='text-xl font-semibold mb-4'>
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h3>
      );
    case 'heading-four':
      return (
        <h4 key={index} className='text-md font-semibold mb-4'>
          {modifiedText.map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h4>
      );
    case 'image':
      return (
        <Image
          key={index}
          src={obj.src}
          width={obj.width}
          height={obj.height}
          alt={obj.title}
        />
      );

    default:
      return modifiedText;
  }
};
