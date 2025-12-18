const selected = new Set();
const container = document.getElementById('numbers');
const resultDiv = document.getElementById('result');

// 번호 생성
for (let i = 1; i <= 45; i++) {
  const div = document.createElement('div');
  div.className = 'ball';
  div.innerText = i;

  div.onclick = () => {
    if (selected.has(i)) {
      selected.delete(i);
      div.classList.remove('selected');
    } else {
      selected.add(i);
      div.classList.add('selected');
    }
  };

  container.appendChild(div);
}

// 결과 출력
function showResult(nums) {
  nums.sort((a, b) => a - b);

  resultDiv.innerHTML =
    '<h3>결과</h3>' +
    '<div class="result-line">' +
    nums.map(n => `<span class="result-ball ${getBallClass(n)}">${n}</span>`).join('') +
    '</div>';

  resultDiv.style.display = 'block';
}

//전체 랜덤
function randomDraw() {
  const nums = [];
  while (nums.length < 6) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  showResult(nums);
}

//선택 랜덤
function selectedDraw() {
  if (selected.size < 6) {
    alert('최소 6개 이상 선택하세요');
    return;
  }

  const arr = Array.from(selected);
  const nums = [];

  while (nums.length < 6) {
    const n = arr[Math.floor(Math.random() * arr.length)];
    if (!nums.includes(n)) nums.push(n);
  }
  showResult(nums);
}

//초기화
function resetAll() {
  selected.clear();

  document.querySelectorAll('.ball').forEach(ball => {
    ball.classList.remove('selected');
  });

  resultDiv.style.display = 'none';
  resultDiv.innerHTML = '';
}

function getBallClass(n) {
  if (n <= 10) return 'ball-yellow';
  if (n <= 20) return 'ball-blue';
  if (n <= 30) return 'ball-red';
  if (n <= 40) return 'ball-gray';
  return 'ball-green';
}