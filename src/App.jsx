import { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const checks = [
  ['At least 8 characters', v => v.length >= 8],
  ['One uppercase letter (A–Z)', v => /[A-Z]/.test(v)],
  ['One lowercase letter (a–z)', v => /[a-z]/.test(v)],
  ['One number (0–9)', v => /\d/.test(v)],
  ['One special symbol (!@#$…)', v => /[^A-Za-z0-9\s]/.test(v)]
];

export default function App() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [show,setShow]=useState(false);
  const [remember,setRemember]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [success,setSuccess]=useState(false);
  const emailOK=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const rules=checks.map(([label,test])=>({label,passed:test(password)}));
  const passwordOK=rules.every(r=>r.passed);
  const count=rules.filter(r=>r.passed).length;
  function submit(e){e.preventDefault();setSubmitted(true);setSuccess(emailOK&&passwordOK);}
  return <main className="page"><section className="card">
    <div className="brand"><span className="logo"><i/><i/><i/></span><span>MaterialM</span></div>
    <p className="subtitle">Sign In on MaterialM</p>
    <form onSubmit={submit} noValidate>
      <div className="field"><label htmlFor="email">Email Address</label>
        <input id="email" type="email" value={email} onChange={e=>{setEmail(e.target.value);setSuccess(false)}} placeholder="Enter your email" autoComplete="email" aria-invalid={(submitted||email.length>0)&&!emailOK}/>
        <p className={'message '+(((submitted||email.length>0)&&!emailOK)?'error':'')}>{((submitted||email.length>0)&&!emailOK)?'Enter a valid email (example: name@example.com).':' '}</p>
      </div>
      <div className="field"><label htmlFor="password">Password</label>
        <div className="password"><input id="password" type={show?'text':'password'} value={password} onChange={e=>{setPassword(e.target.value);setSuccess(false)}} placeholder="Enter your password" autoComplete="current-password" aria-invalid={(submitted||password.length>0)&&!passwordOK}/>
          <button className="eye" type="button" onClick={()=>setShow(!show)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={19}/>:<Eye size={19}/>}</button></div>
        <div className="strength-head"><span>Password requirements</span><span className={count===5?'green':''}>{count}/5 met</span></div>
        <div className="track"><span style={{width:(count*20)+'%'}}/></div>
        <ul className="rules">{rules.map(r=><li className={r.passed?'passed':''} key={r.label}>{r.passed?<Check size={14}/>:<X size={14}/>}<span>{r.label}</span></li>)}</ul>
        {submitted&&!passwordOK&&<p className="message error">Please meet all five password requirements.</p>}
      </div>
      <div className="options"><label className="remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/><span>Remember this Device</span></label>
        <button type="button" className="link" onClick={()=>window.alert('Password reset is not connected to a backend in this demo.')}>Forgot Password?</button></div>
      <button className="submit" type="submit">Sign in</button>
      {submitted&&!success&&<div className="notice errorbox" role="alert">Please correct the highlighted fields before signing in.</div>}
      {success&&<div className="notice successbox" role="status">Login successful! Your email and password meet the requirements.</div>}
    </form>
    <div className="signup"><span>New to MaterialM?</span><button type="button" className="link" onClick={()=>window.alert('Account creation is not connected in this demo.')}>Create an account</button></div>
  </section><footer>MaterialM Login Demo</footer></main>;
}