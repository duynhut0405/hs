import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import Modal from 'react-bootstrap/Modal';

function Question({ commonData, productId }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const { user, isAuthenticated } = useAuth();
  const { setOpenModal } = useAuth();
  const [modalText, setModalText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    if (!isAuthenticated) {
      setOpenModal(true);
      return;
    }
    setModalText('Gửi thất bại');
    setLoading(true);
    try {
      const result = await api.post('service/faq/save-question', {
        questionInformation: {
          title: data.question,
          name: user.lastname + '' + user.firstname,
          email: user.email,
          notification: true,
          product_ids: productId,
          category_ids: null,
        },
      });
      setModalText('Gửi thành công');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setModalShow(false);
      return;
    }
    setLoading(false);
    setModalShow(true);
    setQuestion('');
  };

  return (
    <>
      <h3>Câu hỏi thường gặp</h3>
      <div className='box-shadow mb-40' style={{ padding: '20px' }}>
        <div className='accodion accodion-0 rotate'>
          {commonData.questions.map((item, index) => (
            <div className='accodion-tab ' key={index} onClick={() => setActiveIndex(index)}>
              <input type='radio' id={`chck_0_${index}`} checked={index == activeIndex} value={activeIndex} onChange={() => setActiveIndex(index)} />
              <label className='accodion-title' htmlFor={`chck_0_${index}`}>
                <i className='icon-faq'></i> <span> {item.title}</span>{' '}
                <span className='triangle'>
                  <i className='icon-arrow-1 ib'></i>
                </span>{' '}
              </label>
              <div className='accodion-content entry-content'>
                <div className='inner'>{ReactHtmlParser(item.content)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <h3>Đặt câu hỏi</h3>
      <form className={`box-shadow pd-20 ${loading ? 'loading' : ''}`} onSubmit={handleSubmit(submit)}>
        
        <textarea maxLength="1000" className="input" name="question" ref={register({ required: true })} value={question} onChange={(e) => setQuestion(e.target.value)}></textarea><br/><br/>
        <p >
          <button type={submit} className="btn btn-4 pull-right">Gửi câu hỏi</button>
          <span className="cl4">{question.length}/1000</span>
        </p>
      </form> */}
      <Modal size='sm' show={modalShow} onHide={() => setModalShow(false)}>
        <div className='pd-20'>{modalText}</div>
      </Modal>
    </>
  );
}

export default Question;
