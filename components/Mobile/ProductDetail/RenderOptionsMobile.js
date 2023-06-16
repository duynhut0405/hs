import { HuePicker } from 'react-color';
import t from '../../../translation';

export default function RenderOptionsMobile({
  setQtyState,
  qtyBrickExchange,
  handleSquare,
  priceGroup,
  productOptions,
  renderCustomOptions,
  currentOptions,
  setModalShowTon,
  attributes,
  productPaintColor,
  exchangeBrick,
  handleTypeColorSelect,
  paintColor,
  handleChangeColor,
  typeAllColor,
  suggestColorList,
  setProductPaintColor,
  handleQty,
  setQtyClient,
  setQty,
  qty,
  unit,
  square,
  state,
  updateStateQty,
  productVarients,
  handleOption,
  setSquare,
  checkOut,
  addToCart,
  isLoading,
  addToState,
  removeToState,
  setValueState,
  checkValueState,
  renderAnotherColorTon,
  renderCategoriesProduct,
  renderChooseColor,
  renderGach,
  renderTon,
}) {
  const _renderAnotherColorTon = () => {
    return (
      <div className='pd-20 group-addcart'>
        <h5>Lựa chọn màu khác</h5>
        <button className='btn btn-6 addtocart' onClick={() => setModalShowTon(true)}>
          Danh sách sản phẩm
        </button>
      </div>
    );
  };

  const _renderCategoriesProduct = () => {
    return (
      <div className='pd-15 line-bottom'>
        <h5>Phân loại sản phẩm</h5>
        <div className='row list-item-10'>
          {currentOptions.values.map((item, index) => (
            <div className='col-6' key={index}>
              <div className='input-title'>{item.label}</div>
              <select className='select filter-option' disabled={!item.active} defaultValue={'reset'} id={`filter-option` + index} name={item.attribute_id} onChange={(e) => handleOption(e, index)}>
                <option value={'reset'}>Lựa chọn</option>

                {item.values.map((data, i) => {
                  let check = false;
                  const list_option = Object?.values(productVarients)?.map((item) => Object?.values(item)[index]);

                  list_option?.map((id_option) => {
                    if (id_option === data?.value_index) {
                      check = true;
                      return;
                    }
                  });

                  if (check) {
                    return (
                      <option value={data?.value_index} key={'000' + i}>
                        {data?.label}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const _renderCustomOptions = () => {
    return (
      <div className='pd-15 line-bottom'>
        <h5>Phân loại sản phẩm</h5>
        <div className='row list-item-10'>
          <div className='col-6'>
            <div className='input-title'>Loại sóng</div>
            <select className='select filter-option' defaultValue={'reset'} id={`filter-option`} onChange={(e) => handleOption(e)}>
              <option value={'reset'}>Lựa chọn</option>
              {renderCustomOptions.map((item, index) => {
                return (
                  <option value={item} key={'000' + index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  };

  const _renderChooseColor = () => {
    return (
      <div className='pd-20'>
        <h5>Chọn màu sơn</h5>
        <div className='orderby' style={{ display: 'flex', whiteSpace: 'nowrap', overflow: 'auto', paddingBottom: '10px' }}>
          <div className='order'>
            <a className={`t1 ${typeAllColor == 'all' ? 'active underline' : ''}`} style={{ marginRight: '20px' }} onClick={() => handleTypeColorSelect('all')}>
              Màu khác
            </a>
            <a className={`t1 ${typeAllColor == 'white' ? 'active underline' : ''}`} style={{ marginRight: '20px' }} onClick={() => handleTypeColorSelect('white')}>
              Màu trắng
            </a>
            <a className={`t1 ${typeAllColor == 'black' ? 'active underline' : ''}`} style={{ marginRight: '20px' }} onClick={() => handleTypeColorSelect('black')}>
              Màu đen
            </a>
          </div>
        </div>
        <br />
        {typeAllColor == 'all' && (
          <>
            <div className='row'>
              <HuePicker width='100%' color={paintColor} onChangeComplete={handleChangeColor}></HuePicker>
            </div>
            <br />
          </>
        )}

        {suggestColorList && (
          <div>
            <h6> Bảng màu sản phầm</h6>
            <div className='row'>
              {suggestColorList &&
                suggestColorList.map((item, index) => (
                  <div className='col-1' key={index} style={{ padding: '5px' }}>
                    <div className='item tRes' style={{ backgroundColor: item.color }} onClick={() => setProductPaintColor({ color: item.color, id: item.id, label: item.label })}>
                      <span className='t1'></span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <br />

        {productPaintColor.color && (
          <div>
            <h6>Màu đã chọn </h6>
            <div className='row'>
              <div className='col-6 text-center'> Mã màu : {productPaintColor.label} </div>
              <div className='col-3' style={{ height: '25px', backgroundColor: productPaintColor.color }}></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const _renderGach = () => {
    return (
      <>
        {!exchangeBrick && (!attributes?.category?.name?.includes('Gạch' || 'gạch') || unit != '₫/Viên') ? (
          <div className='pd-15 group-addcart sec-bd-bottom'>
            <h5>{t('qty')}</h5>
            <div className='items'>
              <div className='qualitys'>
                <a className='minus' onClick={() => handleQty('minus')}>
                  <i className='icon-minus'></i>
                </a>
                <input
                  className='number'
                  type='input'
                  value={qty}
                  onChange={(e) => {
                    setQtyClient(e);
                  }}
                />
                <a className='plus' onClick={() => handleQty('plus')}>
                  <i className='icon-plus'></i>
                </a>
              </div>
            </div>
          </div>
        ) : (unit == '₫/m²' || unit == '₫/M2') && exchangeBrick ? (
          <div className='pd-20 group-addcart'>
            <h5>{t('detail')}</h5>
            <div className='table-group-addcart cart-gach-mb'>
              <div className=' w5'>{unit == '₫/Viên' ? 'Số viên cần ốp' : 'Diện tích cần lát gạch (m²)'}</div>
              <div className='qualitys mb-10'>
                <a className='minus' onClick={() => handleQty('minus')}>
                  <i className='icon-minus'></i>
                </a>
                <input
                  className='number'
                  type='number'
                  onKeyPress={(e) => {
                    if (new RegExp(/[0-9]/).test(e.key)) {
                    } else e.preventDefault();
                  }}
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                />
                <a className='plus' onClick={() => handleQty('plus')}>
                  <i className='icon-plus'></i>
                </a>
              </div>
              <div className=' w5 mb-10'>
                {unit == '₫/Viên' ? 'Số viên quy đổi ra thùng' : 'Số thùng quy đổi'} : <span className='cl1'>{Math.ceil(qty / exchangeBrick)}</span> thùng
              </div>
              <div className=' w5'>
                {unit == '₫/Viên' && (
                  <>
                    {' '}
                    Diện tích thực tế : <span className=''>{(Math.ceil(qty / exchangeBrick) * exchangeBrick).toFixed(2)}</span> m²
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='pd-20 group-addcart'>
            <h5>{t('detail')}</h5>
            <div className='table-group-addcart cart-gach-mb'>
              <div className=' w5'>{unit == '₫/Viên' ? 'Số viên cần ốp' : 'Diện tích cần lát gạch (m²)'}</div>
              <div className='qualitys mb-10'>
                <a className='minus' onClick={() => handleSquare('minus')}>
                  <i className='icon-minus'></i>
                </a>
                <input
                  className='number'
                  type='number'
                  value={square}
                  onChange={(e) => {
                    setSquare(e.target.value);
                  }}
                />
                <a className='plus' onClick={() => handleSquare('plus')}>
                  <i className='icon-plus'></i>
                </a>
              </div>
              <div className=' w5 mb-10'>
                {unit == '₫/Viên' ? 'Số viên quy đổi ra thùng' : 'Số thùng quy đổi'} : <span className='cl1'>{qtyBrickExchange}</span> thùng{' '}
              </div>
              {unit != '₫/Viên' && (
                <div className=' w5'>
                  Diện tích thực tế : <span className='cl1'>{(Math.ceil(square / exchangeBrick) * exchangeBrick).toFixed(2)}</span> m²
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  const _renderTon = () => {
    return (
      <>
        <div className='pd-20 group-addcart'>
          <h5>{t('detail')}</h5>
          <table className='table-group-addcart mmmm'>
            <tr className=''>
              <td className='c1'> Chiều dài (m)</td>
              <td className='c2'>
                Số lượng
                {priceGroup && 'Dây cáp điện'.includes(priceGroup.group) && ' (dây)'}
                {priceGroup && 'Thép dày mạ kẽm'.includes(priceGroup.group) && ' (cây)'}
                {priceGroup && 'Tôn lạnh,Tôn lạnh màu,Tôn PU lạnh màu,Tôn Hoa Sen Gold'.includes(priceGroup.group) && ' (tấm)'}
                {priceGroup && 'Thép xây dựng'.includes(priceGroup.group) && ' (m)'}
              </td>
              <td className='c3'> Tổng</td>
              <td className='c4'> </td>
            </tr>
            {state &&
              state.items.map((item, index) => (
                <tr className='' key={index}>
                  <td className='c1'>
                    <input className='number input' type='number' value={item.value} onChange={(e) => setValueState(e, index)} onBlur={(e) => checkValueState(e, index)} />
                  </td>
                  <td className='c2'>
                    <div className='qualitys'>
                      <a className='minus' onClick={() => updateStateQty(index, 'minus')}>
                        <i className='icon-minus'></i>
                      </a>
                      <input className='number' type='input' value={item.qty} onChange={(e) => setQtyState(e, index)} />
                      <a className='plus' onClick={() => updateStateQty(index, 'plus')}>
                        <i className='icon-plus'></i>
                      </a>
                    </div>
                  </td>

                  <td className='c3 total b cl1'>
                    <span className=''>{Number.isInteger(item.value * item.qty) ? item.value * item.qty : (item.value * item.qty).toFixed(2)}</span> m
                  </td>
                  <td>
                    {index == 0 && (
                      <span className='abtn more' onClick={() => addToState()}>
                        Thêm
                      </span>
                    )}
                    {index != 0 && (
                      <span className='abtn remove' onClick={() => removeToState(index)}>
                        Xoá
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </>
    );
  };

  return (
    <>
      {renderAnotherColorTon && _renderAnotherColorTon()}

      {renderCategoriesProduct && _renderCategoriesProduct()}

      {renderCustomOptions?.length !== 0 && _renderCustomOptions()}

      {renderChooseColor && _renderChooseColor()}

      {renderGach && _renderGach()}

      {renderTon && _renderTon()}
    </>
  );
}
