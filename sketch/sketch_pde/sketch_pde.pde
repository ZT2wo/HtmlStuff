import peasy.*;

PeasyCam cam;

final int BCK = 0;
final int FWD = 1;
final int LFT = 2;
final int RHT = 3;
final int UPP = 4;
final int DWN = 5;

//up, down, right, left, front, back
color[] colors = {
  #FFFEFF, #FF01FB, 
  #02A9EA, #FAFF00, 
  #00FFBB, #000300
};


int dim = 3;
Cubie[] cube = new Cubie[dim*dim*dim];

String[] allMoves = {"f", "b", "u", "d", "l", "r"};
String sequence = "";
int counter = 0;

boolean started = false;

void randomize() {
  for (int i = 0; i < 200; i++) {
    int r = int(random(allMoves.length));
    if (random(1) < 0.5) {
      sequence += allMoves[r];
    } else {
      sequence += allMoves[r].toUpperCase();
    }
  }
}

//  for (int i = sequence.length()-1; i >= 0; i--) {
//    String nextMove = flipCase(sequence.charAt(i));
//    sequence += nextMove;
//  }
//}


void setup() {
  size(600, 600, P3D);
  cam = new PeasyCam(this, 400);
  int index = 0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      for (int z = -1; z <= 1; z++) {
        PMatrix3D matrix = new PMatrix3D();
        matrix.translate(x, y, z);
        cube[index] = new Cubie(matrix, x, y, z);
        index++;
      }
    }
  }
  randomize();
}

String flipCase(char c) {
  String s = "" + c;
  if (s.equals(s.toLowerCase())) {
    return s.toUpperCase();
  } else {
    return s.toLowerCase();
  }
}




void turnZ(int index, int dir) {
  for (int i = 0; i < cube.length; i++) {
    Cubie qb = cube[i];
    if (qb.z == index) {
      PMatrix2D matrix = new PMatrix2D();
      matrix.rotate(dir*HALF_PI);
      matrix.translate(qb.x, qb.y);
      qb.update(round(matrix.m02), round(matrix.m12), round(qb.z));
      qb.turnFacesZ(dir);
    }
  }
}

void turnY(int index, int dir) {
  for (int i = 0; i < cube.length; i++) {
    Cubie qb = cube[i];
    if (qb.y == index) {
      PMatrix2D matrix = new PMatrix2D();
      matrix.rotate(dir*HALF_PI);
      matrix.translate(qb.x, qb.z);
      qb.update(round(matrix.m02), qb.y, round(matrix.m12));
      qb.turnFacesY(dir);
    }
  }
}

void turnX(int index, int dir) {
  for (int i = 0; i < cube.length; i++) {
    Cubie qb = cube[i];
    if (qb.x == index) {
      PMatrix2D matrix = new PMatrix2D();
      matrix.rotate(dir*HALF_PI);
      matrix.translate(qb.y, qb.z);
      qb.update(qb.x, round(matrix.m02), round(matrix.m12));
      qb.turnFacesX(dir);
    }
  }
}




void draw() {
  background(51); 

  if (started) {
    if (frameCount % 1 == 0) {
      if (counter < sequence.length()) {
        char move = sequence.charAt(counter);
        applyMove(move);
        counter++;
      }
      if (counter > sequence.length()) {
        char move = key;
        applyMove(move);
      }
    }
  }

  scale(50);
  for (int i = 0; i < cube.length; i++) {
    cube[i].show();
  }
}
