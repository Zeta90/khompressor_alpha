# khompressor_alpha

[LOG]
- Knobs rotation                                          [DONE]
- Knobs leds 'on' on wave template loading                [NOT FINISHED YET]
- Square - Step template                                  [DONE]



    def generate_signal_values(self,smpls):
        self.x = [0]
        self.v = [0]
        self.t = []
        for i in range(smpls):
            if(i<(smpls/10)):
                x, v = self.physics.Right(i,self.delta_t)
                t = i * self.delta_t
                self.x.append(x)
                self.v.append(v)
                self.t.append(t)
            elif(i<(smpls-1)):
                x, v = self.physics.Middle(i,self.delta_t)
                t = i * self.delta_t
                self.x.append(x)
                self.v.append(v)
                self.t.append(t)
        print((self.x))
        return self.x, self.t, self.v