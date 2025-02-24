import { injectable } from 'inversify';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

@injectable()
export class JWT {
  private jwtSecret = 'cigarette';
  private jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: this.jwtSecret
  };

  constructor() {
    this.strategy();
  }

  strategy() {
    let str = new JWTStrategy(this.jwtOptions, (payload, done) => {
      done(null, payload);
    });
    passport.use(str);
  }

  // 中间件
  static middleware() {
    return passport.authenticate('jwt', { session: false });
  }

  // 生成token
  public generateToken(payload: Object) {
    return jsonwebtoken.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  public verifyToken(token: string) {
    return jsonwebtoken.verify(token, this.jwtSecret);
  }

  // 关联express
  public init() {
    return passport.initialize();
  }
}
