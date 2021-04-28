import React, { useRef, useEffect } from 'react';

function SecurityCode(props) {
  const [draw, setDraw] = React.useState(true);
  const { refresh } = props 
  
  const canvas = useRef();
  let ctx = null;
  console.log('draw: ', draw)
  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    setDraw({draw: refresh})
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {  console.log('draw: ', draw)

    console.log('Canves useEffect not start')
    if(draw){console.log('Canves useEffect start')
      writeText({ text: generateCode(), x: 5, y: 0 });
    }
  }, [draw]);

  // write a text
  const writeText = (info, style = {}) => {console.log('Canves writeText start')
    const { text, x, y } = info;
    const { fontSize = 14, fontFamily = 'Arial', fontWeight = 'bold', textWidth = '100', textAlign = 'left', textBaseline = 'top' } = style;

    var gradient = ctx.createLinearGradient(20, 0, 120, 0);
    gradient.addColorStop(0,  'rgb(253, 56, 7)');
    gradient.addColorStop(.5, '#fd8555');
    gradient.addColorStop(1, 'rgb(253, 56, 7)');

    ctx.beginPath();
    ctx.font = fontWeight + ' ' + fontSize + 'pt ' + fontFamily;
    ctx.textWidth = textWidth;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y, 110);
    ctx.stroke();
  }

  const generateCode = () => {console.log('Canves generateCode start')
    let text = "QWERTYUIOPASDFGHJKLZXCVBNM123456789QWERTYUIOPASDFGHJKLZXCVBNM123456789"
    let code = ''

    for(var i=0; i<6; i++){
      let start = Math.floor(Math.random() * text.length + 1)  
      let one_char = text.substring(start, start + 1);
      code += one_char;
    }
    sessionStorage.setItem("securityCode", code);
    return code;
  }

  return (
    <div >
      <canvas ref={canvas} width="120" height="28" {...props}>{console.log('useRef doing ...')}</canvas>{console.log('useRef done')}
    </div>
  );
}

export default SecurityCode;



// class Canvas extends React.Component {
//     componentDidMount() {
//       const canvas = this.refs.canvas
//       const ctx = canvas.getContext("2d")
//       const img = this.refs.image
//       const text = this.generateCode()

//       img.onload = () => {
//         ctx.drawImage(img, 0, 0)
//         ctx.font = "40px Courier"
//         ctx.fillText(text, 210, 75)
//       }
//     }
  //   render() {
  //     return(
  //       <div>
  //         <canvas ref="canvas" width={640} height={425} />
  //         <img ref="image" alt="" className="hidden" />
  //       </div>
  //     )
  //   }
  // }
  // export default Canvas