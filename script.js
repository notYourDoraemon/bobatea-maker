let state = { cupColor: 'transparent', teaFlavor: 'classic', toppings: [] };
const colors = { classic: '#8B4513', matcha: '#90EE90', taro: '#DDA0DD', strawberry: '#FFB6C1' };
//boba customisation
function updateDisplay() {
    const cup = document.getElementById('bobaCup');
    const liquid = document.getElementById('teaLiquid');
    const container = document.getElementById('toppingsContainer');
    
    cup.className = `cup ${state.cupColor}`;
    liquid.style.background = colors[state.teaFlavor];
    container.innerHTML = '';
    
    state.toppings.forEach((type, i) => {
        for (let j = 0; j < 10; j++) {
            const topping = document.createElement('div');
            topping.className = `topping ${type}`;
            topping.style.cssText = `left:${Math.random()*80}%;bottom:${i*15+Math.random()*10}px;animation-delay:${Math.random()*0.5}s`;
            container.appendChild(topping);
        }
    });
    
    const names = { transparent: 'clear', blue: 'blue', pink: 'pink', purple: 'purple', classic: 'Classic', matcha: 'Matcha', taro: 'Taro', strawberry: 'Strawberry', tapioca: 'tapioca pearls', jelly: 'grass jelly', popping: 'popping boba', pudding: 'pudding' };
    const desc = `${names[state.teaFlavor]} bubble tea in a ${names[state.cupColor]} cup` + (state.toppings.length ? ` with ${state.toppings.map(t => names[t]).join(', ')}` : '');
    document.getElementById('drinkDescription').textContent = desc;
}

document.addEventListener('click', e => {
    if (e.target.closest('.cup-color')) {
        document.querySelectorAll('.cup-color').forEach(b => b.classList.remove('active'));
        e.target.closest('.option-btn').classList.add('active');
        state.cupColor = e.target.closest('.option-btn').dataset.color;
        updateDisplay();
    }
    if (e.target.closest('.tea-flavor')) {
        document.querySelectorAll('.tea-flavor').forEach(b => b.classList.remove('active'));
        e.target.closest('.option-btn').classList.add('active');
        state.teaFlavor = e.target.closest('.option-btn').dataset.flavor;
        updateDisplay();
    }
    if (e.target.closest('.topping')) {
        const btn = e.target.closest('.option-btn');
        const topping = btn.dataset.topping;
        btn.classList.toggle('active');
        state.toppings = btn.classList.contains('active') ? [...state.toppings, topping] : state.toppings.filter(t => t !== topping);
        updateDisplay();
    }
    if (e.target.id === 'createDrink') {
        const btn = e.target;
        btn.disabled = true;
        btn.textContent = '✨ Creating...';
        setTimeout(() => { btn.textContent = '🎉 Drink Created!'; setTimeout(() => { btn.disabled = false; btn.textContent = '✨ Create My Drink! ✨'; }, 2000); }, 1000);
    }
});

document.addEventListener('DOMContentLoaded', updateDisplay);
