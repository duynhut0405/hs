export default function ImageHouse({ color }) {
  return (
    <div className='colorful box-shadow '>
      <img id='background-image' src={'/images/ton_vn.jpg'} alt='' />
      <div id='container'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 956'>
          <defs></defs>
          <title>04_Solid</title>
          <g id='Layer_2' data-name='Layer 2'>
            <g id='Layer_1-2' data-name='Layer 1'>
              <rect className='cls-1' width='1440' height='956' />
              <polygon
                style={{ fill: color }}
                className='cls-2'
                points='791.66 233.93 768 249.25 730.05 253.5 712.86 270.36 850.9 290.78 1009.71 135.42 1139.15 238.25 1144.52 238.25 1016.94 135.72 1018.39 133.25 1012.43 127.55 811.41 114.95 635.92 45.67 239.79 207.16 579.75 262.19 791.66 233.93'
              />
              <polygon
                style={{ fill: color }}
                className='cls-2'
                points='921.54 327.89 915.68 333.59 915.68 336.42 877.83 374.27 877.83 378.48 864.56 392.52 861.75 392.27 838.9 416.14 973.45 446.14 1048.39 359.72 1051.77 359.72 1056.37 354.23 1060.9 357.36 1062.75 355.44 1056.52 350.19 921.54 327.89'
              />
              <path
                style={{ fill: color }}
                className='cls-2'
                d='M1121.92,352.31h-5.36v4.21l-2.94,1.66-3.06-3.06-36.51,10.21,50.93,36h5.24v4h-1.34a26.58,26.58,0,0,1,0,3.89h-2.24v6.45l-20.55,6.58h-8.55V421h-10.22v40.34c6.26-.12,7.66,2.56,7.66,2.56l165.19-53.49Z'
              />
              <path
                className='cls-2'
                style={{ fill: color }}
                d='M862.51,583.12l-36.12-27.57v-2.94l-71.92-53.49-8.13-9.45h-5.1L737,494.52,600.81,591.67v2.17s-14.3,11.75-14.68,11.75-29.74-11-29.74-11v-3L314.85,501.29l-3.44,2.81-18.26-7-24.89,16.51,470,185.87,191.06-75.1-59.23-44.81Z'
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
