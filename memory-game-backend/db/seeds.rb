# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


CardSet.destroy_all
Card.destroy_all

CardSet.reset_pk_sequence
Card.reset_pk_sequence

CardSet.create!(theme: "default")

	cards = [
		{
			imageUrl: "https://www.meme-arsenal.com/memes/81332eb76bf78151448789564ad869fa.jpg",
			card_set_id: CardSet.first.id
        },
        {
			imageUrl: "https://fractalenlightenment.com/wp-content/uploads/2014/05/consciousnesss-e1435475009441.jpg",
			card_set_id: CardSet.first.id
        },
        {
			imageUrl: "https://steemitimages.com/DQmX2GesFWhmvYqgsTxXRLNcdwxoodLdyXNDDN8sMBqeUze/consciousness.jpg",
			card_set_id: CardSet.first.id
        },
        {
			imageUrl: "https://previews.123rf.com/images/shikshik/shikshik1610/shikshik161000056/64863197-third-eye-with-floral-mandala-drawing-line-art-boho-chic-style-best-for-adult-coloring-book-and-medi.jpg",
			card_set_id: CardSet.first.id
        },
        {
			imageUrl: "https://previews.123rf.com/images/iostephy/iostephy1511/iostephy151100012/47999827-silhouette-meditation-chakra-and-light-transparency-blending-effects-and-gradient-mesh-eps-10-.jpg",
			card_set_id: CardSet.first.id
        },
        {
			imageUrl: "https://images.samash.com/sa/STS/STS711XXX-P.fpx?cvt=jpg",
			card_set_id: CardSet.first.id
        },
        {
			imageUrl: "https://az58332.vo.msecnd.net/e88dd2e9fff747f090c792316c22131c/Images/Products1005025-1200x1200--103675859.jpg",
			card_set_id: CardSet.first.id
        },
        {
			imageUrl: "https://az58332.vo.msecnd.net/e88dd2e9fff747f090c792316c22131c/Images/Products1734-1200x1200-1484268.jpg",
			card_set_id: CardSet.first.id
        },
        {
			imageUrl: "https://kawaius.com/wp-content/uploads/2018/06/Kawai-RX-1-Grand-Piano.jpg",
			card_set_id: CardSet.first.id
        },
        {
			imageUrl: "https://images.guitarguitar.co.uk/cdn/large/130/06060817261928f2.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
			card_set_id: CardSet.first.id
        }
    ] 

	cards.each do |card|
	     Card.create!(card)
	end 
