import React from 'react';

const Card = ({ title, content ,imageUrl}) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{content}</p>
    <img src={imageUrl} alt={title} />
    <button>Enroll for Feature</button>
  </div>
);

const Features = () => {
  return (
    <div >
    <h1>Please select your TEZ redeem choice</h1>
      <div className="screen-left">
        <Card title="Consultancy" 
        content="Use the TEZ tokens for a one to one session with a senior crypto guide"
        imageUrl="https://www.freeiconspng.com/thumbs/consultancy-icon/business-consulting-icon-0.png"  />
        
        <Card title="Pooling" 
        content="Use your TEZ tokens to participate in a pooling event"
        imageUrl="https://simg.nicepng.com/png/small/18-181111_free-icons-png-money-bag-icon-transparent-background.png" />
        
      </div>
      <div className="screen-right">
        
        <Card title="Crowdfunding" 
        content="Use the TEZ tokens to promote the emerging projects/D-Apps and gain with them" 
        imageUrl="https://previews.123rf.com/images/bsd555/bsd5552011/bsd555201102851/159555435-crowdfunding-linear-icon-practice-funding-project-by-raising-small-amounts-of-money-from-people.jpg"
        />
        
        <Card title="Basket Investment" 
        content="Invest your earned TEZ in a safe and tested basket of cryptocurrencies" 
        imageUrl="https://png.pngtree.com/png-clipart/20190705/original/pngtree-basket-icon-vector-illustration-in-line-style-for-any-purpose-png-image_4257254.jpg"
        />
      </div>
    </div>
  );
};

export default Features;
