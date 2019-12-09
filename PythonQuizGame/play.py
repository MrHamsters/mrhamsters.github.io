#Jonathan Jensen
from random import randrange,random
from time import *
from graphics import *
from math import floor
#Create highscores folder (if it doesn't exist)
from os import mkdir
try:
    mkdir("highscores")
except:
    pass
def getfeedback():
    if random()<0.25:
        return "Great job, "
    elif random()<0.33:
        return "Nice one, "
    elif random()<0.5:
        return "Keep up the good work, "
    return "That's right, "
def mousebox(x,y,x1,y1,x2,y2):
    if x>=x1 and x<=x2 and y>=y1 and y<=y2:
         return True
    return False
def formattext(llength,intro):
    res=""
    count=0
    for i in range(len(intro)):
        if count>llength and intro[i]==" ":
            res+="\n"
            count=0
        else:
            count+=1
            res+=intro[i]
    return res
def getpos(qmap):
    while True:
        ind=randrange(0,int(len(qmap)))
        if qmap[ind]==-1:
            return ind
def more(qdata):
    for i in qdata:
        if len(i)>1:
            return True
    return False
def main(sname):
    #Declare variables
    points=maxpts=madelist=anslen=answer=0
    name=intromsg=""
    rdata=qdata=hscores=[]
    ch=sm=True
    g=GraphWin("Super Happy Fun Time Game Show", 900, 600)
    g.setCoords(0,100,100,0)
    g.setBackground("black")
    bg=Image(Point(50,50),"bg.gif")
    bg.draw(g)
    cred=Text(Point(11,98),"Written by Jonathan Jensen")
    cred.setFace("helvetica")
    cred.setStyle("bold")
    cred.setSize(9)
    cred.setFill(color_rgb(255,0,0))
    cred.draw(g)
    ptsdis=Text(Point(26,6),"Points: "+str(points))
    ptsdis.setFace("helvetica")
    ptsdis.setStyle("bold")
    ptsdis.setSize(17)
    ptsdis.setFill(color_rgb(255,0,255))
    title=Text(Point(50,35),"Welcome to Super Happy Fun Time Game Show!")
    title.setFace("helvetica")
    title.setStyle("bold")
    title.setSize(24)
    title.setFill(color_rgb(255,255,0))
    title.draw(g)
    
    ruleb=Rectangle(Point(15,15),Point(85,50))
    ruleb.setFill(color_rgb(255,160,50))
    
    rule=Text(Point(50,30),formattext(35,"In the quiz, there are several categories to choose from. Each category has many questions, placed in a random order. You do not lose any points for answering incorrectly."))
    rule.setFace("helvetica")
    rule.setStyle("bold")
    rule.setSize(19)
    rule.setFill(color_rgb(0,255,0))
    button=[]
    button.append(Polygon(Point(30,60),Point(70,60),Point(75,65),Point(70,70),Point(30,70),Point(25,65)))
    button[0].setFill(color_rgb(0,60,0))
    button[0].setOutline(color_rgb(50,0,0))
    button[0].setWidth(3)
    button[0].draw(g)
    button.append(Text(Point(50,65),"PLAY"))
    button[1].setFace("helvetica")
    button[1].setStyle("bold")
    button[1].setSize(26)
    button[1].setFill(color_rgb(100,255,255))
    button[1].draw(g)
    while sm:
        rules=[]
        rules.append(Polygon(Point(30,80),Point(70,80),Point(75,85),Point(70,90),Point(30,90),Point(25,85)))
        rules[0].setFill(color_rgb(120,60,0))
        rules[0].setOutline(color_rgb(110,0,0))
        rules[0].setWidth(3)
        rules[0].draw(g)
        rules.append(Text(Point(50,85),"How to play (rules)"))
        rules[1].setFace("helvetica")
        rules[1].setStyle("bold")
        rules[1].setSize(16)
        rules[1].setFill(color_rgb(100,255,255))
        rules[1].draw(g)
        ch=True
        while ch:
            if sname!="":
                ch=False
                sm=False
                break
            m=g.getMouse()
            if mousebox(m.getX(),m.getY(),30,60,80,70):
                ch=False
                sm=False
            
            elif mousebox(m.getX(),m.getY(),30,80,80,90):
                ch=False
                rules[0].undraw()
                rules[1].undraw()
                title.undraw()
                button[0].undraw()
                button[1].undraw()
                rules=[]
                rules.append(Polygon(Point(30,85),Point(70,85),Point(75,90),Point(70,95),Point(30,95),Point(25,90)))
                rules[0].setFill(color_rgb(120,60,0))
                rules[0].setOutline(color_rgb(110,0,0))
                rules[0].setWidth(3)
                rules[0].draw(g)
                rules.append(Text(Point(50,90),"Return to main menu"))
                rules[1].setFace("helvetica")
                rules[1].setStyle("bold")
                rules[1].setSize(14)
                rules[1].setFill(color_rgb(255,215,255))
                rules[1].draw(g)
                ruleb.draw(g)
                rule.draw(g)
                ch=True
                while ch:
                    m=g.getMouse()
                    if mousebox(m.getX(),m.getY(),30,85,80,95):
                        ch=False
                        rules[0].undraw()
                        rules[1].undraw()
                        rule.undraw()
                        ruleb.undraw()
                        title.draw(g)
                        button[0].draw(g)
                        button[1].draw(g)
    title.undraw()
    rules[0].undraw()
    rules[1].undraw()
    if sname=="":
        button[0].setFill(color_rgb(80,80,0))
        button[1].setText("START")
        ntext=Text(Point(40,50),"Your name:  ")
        ntext.setFace("helvetica")
        ntext.setSize(15)
        ntext.setStyle("bold")
        ntext.draw(g)

        #Get name
        inbox=Entry(Point(60,50),15)
        inbox.draw(g)
        ch=True
        while ch:
            m=g.getMouse()
            if mousebox(m.getX(),m.getY(),30,60,80,70):
                if inbox.getText()=="":
                    name="Guest"
                else:
                    name=inbox.getText().strip().capitalize()[:16]
                ch=False
        inbox.undraw()
        ntext.undraw()
    else:
        name=sname
    namedis=Text(Point(11,5),name)
    namedis.setFace("helvetica")
    namedis.setStyle("bold")
    namedis.setSize(11)
    namedis.setFill(color_rgb(70,70,255))
    button[0].undraw()
    button[1].undraw()

    
    #Get quiz name - potential update: multiple quiz selection
    quizname="League Trivia"

    

    try:
        bg.undraw()
        bg=Image(Point(50,50),"quizzes/"+quizname+"/bg.gif")
        bg.draw(g)
    except:
        print("Could not find custom background. Leaving at default.")

    qnamedis=Text(Point(55,5),quizname)
    qnamedis.setFace("helvetica")
    qnamedis.setStyle("bold")
    qnamedis.setSize(11)
    qnamedis.setFill(color_rgb(70,220,255))
    qnamedis.draw(g)
    
    ptsdis.draw(g)
    cred.undraw()
    cred.draw(g)
    namedis.draw(g)
    
    #Show intro
    try:
        file=open("quizzes/"+quizname+"/intro.txt","r")
        rdata=file.readline()
        file.close()
    except:
        rdata="No introduction was found for this quiz!"
    
    display=[]
    display.append(Rectangle(Point(10,10),Point(90,40)))
    display[0].setFill(color_rgb(215,210,255))
    display[0].draw(g)
    display.append(Text(Point(50,25),formattext(40,rdata)))
    display[1].setSize(15)
    display[1].draw(g)
    
    #Get categories
    try:
        file=open("quizzes/"+quizname+"/categories.txt","r")
    except:
        print("Quiz categories not found! File should be \"quizzes/"+quizname+"/categories.txt\".")
        g.close()
        main("")
    rdata=file.readlines()
    file.close()

    #Build quiz base
    qdata=[]
    #cleanlist(rdata)
    for i in rdata:
        i=i.strip()
    #Remove the annoying \n from category names
    rdata=list(map(lambda s:s.strip(),rdata))
    for i in rdata:
        qdata.append([i])

    #Get categories
    qct=0
    for i in range(len(qdata)):
        try:
            file=open("quizzes/"+quizname+"/"+qdata[i][0]+".txt","r")
        except:
            print("Category: "+qdata[i][0]+" not found! File should be \"quizzes/"+quizname+"/"+qdata[i][0]+".txt\".")
            g.close()
            main("")
        rdata=file.readlines()
        file.close()
        qmap=[]
        for n in range(int(len(rdata)/3)):
            qmap.append(-1)
        for n in range(int(len(rdata)/3)):
            qmap[getpos(qmap)]=n
        #Remove the annoying \n from quiz data
        rdata=list(map(lambda s:s.strip(),rdata))
        #Add questions
        for n in range(len(qmap)):
            qct+=1
            qdata[i].append([rdata[qmap[n]*3],rdata[qmap[n]*3+1].split(","),int(rdata[qmap[n]*3+2])])
    
    qcount=Text(Point(75,5),"0/"+str(qct))
    qcount.setFace("helvetica")
    qcount.setStyle("bold")
    qcount.setSize(15)
    qcount.setFill(color_rgb(255,225,0))
    qcount.draw(g)
    
    #Dump raw data
    rdata=""

    #Do quiz
    qc=0
    button=[]
    button.append(Polygon(Point(30,60),Point(70,60),Point(75,65),Point(70,70),Point(30,70),Point(25,65)))
    button[0].setFill(color_rgb(50,200,0))
    button.append(Text(Point(50,65),"NEXT"))
    button[1].setFace("helvetica")
    button[1].setStyle("bold")
    button[1].setSize(26)
    button[1].setFill(color_rgb(155,155,0))
    while more(qdata):
        button[0].draw(g)
        button[1].draw(g)
        ch=True
        while ch:
            m=g.getMouse()
            if mousebox(m.getX(),m.getY(),30,60,80,70):
                ch=False
                display[1].setText("Select a category.")
                button[0].undraw()
                button[1].undraw()
                answers=[]
                for i in range(len(qdata)):
                    answers.append([])
                    answers[i].append(Rectangle(Point(5+floor(i/3)*40,44+(i%3)*15),Point(35+floor(i/3)*40,56+(i%3)*15)))
                    if len(qdata[i])>1:
                        answers[i][0].setFill(color_rgb(0,255,0))
                    else:
                        answers[i][0].setFill(color_rgb(255,0,0))
                    answers[i][0].draw(g)
                    answers[i].append(Text(Point(20+floor(i/3)*40,50+(i%3)*15),formattext(10,qdata[i][0])))
                    answers[i][1].setFill(color_rgb(0,0,0))
                    answers[i][1].setSize(16)
                    answers[i][1].draw(g)
                
                ch=True
                while ch:
                    m=g.getMouse()
                    for i in range(len(answers)):
                        if mousebox(m.getX(),m.getY(),5+floor(i/3)*40,44+(i%3)*15,35+floor(i/3)*40,56+(i%3)*15):
                            if len(qdata[i])>1:
                                cat=i
                                ch=False
                                break
                            else:
                                display[1].setText(formattext(40,"That category is empty! Choose another one."))
        for i in answers:
            i[0].undraw()
            i[1].undraw()
        display[1].setText(formattext(40,qdata[cat][1][0]))
        answers=[]

        #Map answers for random order
        qmap=[]
        for i in range(len(qdata[cat][1][1])):
            qmap.append(-1)
        for i in range(len(qdata[cat][1][1])):
            qmap[getpos(qmap)]=i
        for i in range(len(qmap)):
            answers.append([])
            answers[i].append(Rectangle(Point(5+floor(i/3)*40,44+(i%3)*15),Point(35+floor(i/3)*40,56+(i%3)*15)))
            answers[i][0].setFill(color_rgb(255,255,0))
            answers[i][0].draw(g)
            answers[i].append(Text(Point(20+floor(i/3)*40,50+(i%3)*15),formattext(10,qdata[cat][1][1][qmap[i]])))
            answers[i][1].setFill(color_rgb(0,0,0))
            answers[i][1].setSize(16)
            answers[i][1].draw(g)
            if qmap[i]==0:
                answers[i].append(True)
            else:
                answers[i].append(False)
        ch=True
        while ch:
            m=g.getMouse()
            for i in range(len(answers)):
                if mousebox(m.getX(),m.getY(),5+floor(i/3)*40,44+(i%3)*15,35+floor(i/3)*40,56+(i%3)*15):
                    ch=False
                    ans=i
                    break
        for i in answers:
            i[0].undraw()
            i[1].undraw()
        maxpts+=qdata[cat][1][2]
        qc+=1
        qcount.setText(str(qc)+"/"+str(qct))
        if answers[ans][2]:
            display[1].setText(formattext(40,getfeedback()+name+"! You earned "+str(qdata[cat][1][2])+" points!"))
            points+=qdata[cat][1][2]
            ptsdis.setText("Points: "+str(points))
        else:
            display[1].setText(formattext(40,"Sorry, "+name+", but that is incorrect..."))
        del(qdata[cat][1])
    
    button[0].draw(g)
    button[1].draw(g)
    ch=True
    while ch:
        m=g.getMouse()
        if mousebox(m.getX(),m.getY(),30,60,80,70):
            ch=False
            display[1].setText(formattext(40,"GG! The quiz has concluded! You got "+str(points)+" points out of "+str(maxpts)+". Click next to submit your score and view current highscores."))
    ch=True
    while ch:
        m=g.getMouse()
        if mousebox(m.getX(),m.getY(),30,60,80,70):
            ch=False
    
    
    #Do highscores
    hsbg=Rectangle(Point(20,10),Point(80,90))
    hsbg.setFill(color_rgb(120,120,255))
    hsbg.draw(g)
    hst=Text(Point(50,15),"HIGHSCORES")
    hst.setFace("helvetica")
    hst.setSize(19)
    hst.setStyle("bold")
    hst.draw(g)
    hsl=[]
    scoreind=-1
    
    try:
        file=open("highscores/"+quizname+".txt","r")
        hscores=file.readlines()
        file.close()
    except:
        hscores=[]
    if len(hscores)<1:
        hscores=[]
    file=open("highscores/"+quizname+".txt","w")

    #Format highscores
    for i in range(len(hscores)):
        hscores[i]=hscores[i].split(",")
        hscores[i][1]=hscores[i][1][:-1]
        
    #Judge new score and show highscore list
    for i in range(len(hscores)):
        if points>int(hscores[i][1]) and not madelist==1:
            hscores.insert(i,[name,points])
            madelist=1
            scoreind=len(hsl)
        print(str(hscores[i][0])+","+str(hscores[i][1]),file=file)
        hsl.append((str(i+1)+") "+hscores[i][0]+": "+str(hscores[i][1])))

    #Add new score if current list is small enough
    if len(hscores)<10 and madelist==0:
        hscores.append([name,points])
        scoreind=len(hsl)
        hsl.append(str(len(hscores))+") "+hscores[len(hscores)-1][0]+": "+str(hscores[len(hscores)-1][1]))
        print(str(hscores[len(hscores)-1][0])+","+str(hscores[len(hscores)-1][1]),file=file)
        
    #Shows lowest score if new score made top 10
    elif len(hscores)<10:
        hsl.append(str(len(hscores))+") "+hscores[len(hscores)-1][0]+": "+str(hscores[len(hscores)-1][1]))
        print(str(hscores[len(hscores)-1][0])+","+str(hscores[len(hscores)-1][1]),file=file)
    file.close()
    
    hsld=[]
    for i in range(len(hsl)):
        hsld.append(Text(Point(50,25+i*6),hsl[i]))
        hsld[i].draw(g)
    if scoreind>-1:
        hsld[scoreind].setStyle("bold")
        hsld[scoreind].setFill(color_rgb(0,100,0))
    button=[]
    button.append(Polygon(Point(30,90),Point(70,90),Point(75,95),Point(70,100),Point(30,100),Point(25,95)))
    button[0].setFill(color_rgb(255,60,0))
    button[0].setOutline(color_rgb(50,0,0))
    button[0].setWidth(3)
    button[0].draw(g)
    button.append(Text(Point(50,95),"PLAY AGAIN"))
    button[1].setFace("helvetica")
    button[1].setStyle("bold")
    button[1].setSize(22)
    button[1].setFill(color_rgb(100,255,255))
    button[1].draw(g)
    ch=True
    while ch:
        m=g.getMouse()
        if mousebox(m.getX(),m.getY(),30,90,80,100):
            ch=False
            g.close()
            main(name)
main("")
