<template>
    <section class="container-md">
        <div class="path">
            <span>About Us</span>
            <img src="~/assets/img/arrow.svg" alt="Arrow">
        </div>

        <div class="about__container">
            <h3>Abouts Us</h3>
            <div class="about__container-item">
                <h4>Why are we the best?</h4>
                <div>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</div>
            </div>
            <div class="about__container-item">
                <h4>What Customers says about us?</h4>
                <ul>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy!</li>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy! Say hello to our Removable Pet Corner</li>
                </ul>
            </div>
            <div class="about__container-item">
                <h4>Who?</h4>
                <ul>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy!</li>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy! Say hello to our Removable Pet Corner</li>
                </ul>
            </div>
            <div class="about__container-item">
                <h4>When?</h4>
                <ul>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy!</li>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy! Say hello to our Removable Pet Corner</li>
                </ul>
            </div>
            <div class="about__container-item text-sm">
                <h4>Some words from our creator</h4>
                <ul>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy!</li>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy! Say hello to our Removable Pet Corner</li>
                </ul>
            </div>
            <div class="about__container-item text-xs">
                <h4>Something</h4>
                <ul>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy!</li>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy! Say hello to our Removable Pet Corner</li>
                </ul>
            </div>
            <div class="about__container-item text-xxs">
                <h4>Something.... Words</h4>
                <ul>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy!</li>
                    <li>Say hello to our Removable Pet Corner Brush</li>
                    <li>The perfect grooming tool to keep your beloved cat looking sleek and tidy! Say hello to our Removable Pet Corner</li>
                </ul>
            </div>
            <div>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</div>
            
        </div>
    </section>
</template>

<script>
export default {
    name: 'About',
}
</script>

<style scoped>
section {
    padding-bottom: 120px;
}

.path {
    color: var(--blue-800);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    line-height: 144%;
    display: flex;
    align-items: flex-end;
    gap: 3px;
    margin-bottom: 24px;
}

h3 {
    color: var(--primary);
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    margin-bottom: 24px;
}

.about__container-item {
    margin-bottom: 16px;
}





.about__container-item h4{
    color: var(--primary);
    font-size: var(--text-md);
    font-weight: var(--font-bold);
    margin-bottom: 8px;
}

.about__container-item div {
    color: var(--primary);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    line-height: 144%;
}

.about__container-item ul {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    line-height: 144%;
    list-style: disc;
    padding-left: 24px;
}

.about__container-item ul li:not(:last-child) {
    margin-bottom: 5px;
}

.about__container-item.text-sm h4 {
    font-size: var(--text-sm);
}

.about__container-item.text-xs h4 {
    font-size: var(--text-xs);
}

.about__container-item.text-xxs h4 {
    font-size: var(--text-xxs);
}

.about__container div:last-child {
    margin-top: 24px;
    font-size: var(--text-xxs);
    color: var(--primary);
    font-weight: var(--font-medium);
    line-height: 144%;
}

</style>