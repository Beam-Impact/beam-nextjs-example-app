import Link from 'next/link'

export default function Nav() {
    return (
        <>
            
            <h1 className="text-3xl mb-4"><img src="https://cdn01.beamimpact.com/chains/img/beam-logo.png" className='mb-4 w-[75%]' alt="Beam Logo" aria-label="Beam Widgets" /></h1>
            <ol>
                <li><Link href="/widgets/select-nonprofit">Select Nonprofit</Link></li>
                <li><Link href="/widgets/redeem-transaction">Redeem Transaction</Link></li>
                <li><Link href="/widgets/impact-overview">Impact Overview</Link></li>
                <li><Link href="/widgets/post-purchase">Post Purchase</Link></li>
                <li><Link href="/widgets/community-impact">Community Impact</Link></li>
                <li><Link href="/widgets/cumulative-impact">Cumulative Impact</Link></li>
                <li><Link href="/widgets/test-store">Beam Store</Link></li>
            </ol>
        </>
    )
}